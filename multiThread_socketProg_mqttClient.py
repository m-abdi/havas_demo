import socket
import time
from paho.mqtt import client as mqtt_client
import select
from threading import Thread, current_thread
from queue import Queue
import logging
from logging.handlers import RotatingFileHandler


IP_Mqtt_Broker = "172.18.200.4"
# IP_Mqtt_Broker = "192.168.1.102"
Port_Mqtt_Broker = 1883
mqtt_topic = "havas/rfid/warehouse/dl920/1"
mqtt_client_id = "laptop1"

IP_dl920_RFID_Reader = '192.168.1.200'
Port_dl920_RFID_Reader = 4002


def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            logger.info("Connected to MQTT Broker!")
        else:
            logger.info("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(mqtt_client_id)
    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect_async(IP_Mqtt_Broker, Port_Mqtt_Broker)
    return client


def publish(client, msg):
    msg_count = 0
    while msg_count < 1:
        result = client.publish(mqtt_topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            logger.info(f"Send `{msg}` to topic `{mqtt_topic}`")
        else:
            logger.info(f"Failed to send message to topic {mqtt_topic}")
        msg_count += 1


def make_recieved_bytes_to_string(recieved_bytes):
    int_list = list(recieved_bytes)
    str_list = [str(x) for x in int_list[6:]]
    tag_id = ''.join(str_list)
    return tag_id


# put received data from Socket in below list before publish it to the MQTT Broker
send_buffer = [None] * 25


# confirm RFID tag in order to be sure it was read correctly
def confirm_tagID_and_add_to_publishQueue(out_q, finalData):
    send_buffer.append(finalData)
    send_buffer.pop(0)
    tagId_reads_times = send_buffer.count(finalData)
    logger.info("its the {}'nd time this tagID is be readen.".format(
        tagId_reads_times))
    # if it is the 3nd time that the RFID Tag detected, publish it MQTT Broker
    if tagId_reads_times > 2:
        out_q.put((finalData))


def publish_to_mqtt_broker(in_q):
    while True:
        if in_q.empty():
            time.sleep(0)
        else:
            final_tag_id = in_q.get()
            publish(client, final_tag_id)


def recieve_from_socket_RFID_Reader(out_q):
    while True:
        list_length_recieved_bytes_eachTime = []
        list_tagId_recieved_eachTime = []
        total_recieved_bytes = 0
        logger.info('*************************')
        # logger.info("current Thread:", current_thread().name)
        logger.info("new tag detected\n")
        while total_recieved_bytes < 19:
            try:
                recieved_bytes = s.recv(18)
                logger.info(f'Lenght recieved_bytes = {len(recieved_bytes)}')

                # instantly all 18 bytes recieved
                if len(recieved_bytes) == 18:
                    logger.info("instantly all 18 bytes recieved")
                    final_tag_id = make_recieved_bytes_to_string(
                        recieved_bytes)
                    logger.info(f"final_tag_id={final_tag_id}")
                    logger.info(f"lenght final_tag_id={len(final_tag_id)}")
                    # add tag id to the queue, in order to publish to mqtt broker
                    confirm_tagID_and_add_to_publishQueue(out_q, final_tag_id)
                    break

                # make the recieved bytes to string and append it in list_tagId_recieved_eachTime
                recieved_tag_id = make_recieved_bytes_to_string(recieved_bytes)
                list_tagId_recieved_eachTime.append(recieved_tag_id)
                # specify how many bytes recieved this time and append it in total_recieved_bytes
                list_length_recieved_bytes_eachTime.append(len(recieved_bytes))
                # specify how many bytes have recieved totaly for current RFID Tag
                total_recieved_bytes = sum(list_length_recieved_bytes_eachTime)

                # when all of 18 bytes have recieved
                if total_recieved_bytes == 18:
                    logger.info("all 18 byte have recieved in distinct pieces")
                    final_tag_id = ''.join(list_tagId_recieved_eachTime)
                    logger.info(f"final_tag_id={final_tag_id}")
                    logger.info(f"lenght final_tag_id={len(final_tag_id)}")
                    # add tag id to the queue, in order to publish to mqtt broker
                    confirm_tagID_and_add_to_publishQueue(out_q, final_tag_id)
                    break

                # When incomplete data received. (less than 18 bytes have recieved yet!)
                else:
                    continue
            except socket.error as e:
                # 10035 is the Error number for:
                # 'non-blocking socket operation could not be completed immediately'
                # means: 'reciever buffer of socket is full'
                # BlockingIOError: [Errno 11] Resource temporarily unavailable
                if e.errno != 10035 and e.errno != 11:
                    raise e
                # reciever buffer of socket is full,, wait 0.5 sec and then try again
                select.select([s], [], [], 0.5)

        logger.info('*************************\n')


# logger setting
logger = logging.getLogger('rfid_log')
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s %(message)s')
# log in to file
# fileHandler = RotatingFileHandler('rfid_responses_logging/rfid_socket_log.log',
#                                   maxBytes=1024*100*20, backupCount=10)
# fileHandler.setFormatter(formatter)
# logger.addHandler(fileHandler)
# print to stdout
consoleHandler = logging.StreamHandler()
consoleHandler.setFormatter(formatter)
logger.addHandler(consoleHandler)

# connect to MQTT Broker and keep it open
logger.info("Trying to connect MQTT Broker...")
client = connect_mqtt()
client.loop_start()

# connect to Rfid Reader
logger.info("Trying to connect socket RFID Reader...")
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
ret = s.connect_ex((IP_dl920_RFID_Reader, Port_dl920_RFID_Reader))
s.setblocking(False)
did_con = 'failed to connect to RFID Reader\n!' if ret != 0 else "socket connected to RFID Reader!\n"
logger.info(did_con)


# Create the shared queue and launch threads
q = Queue()
t2 = Thread(target=recieve_from_socket_RFID_Reader, args=(
    q,), name='recieve_from_socket_RFID_Reader')
t3 = Thread(target=publish_to_mqtt_broker, args=(
    q,), name='publish_to_mqtt_broker')
t2.start()
t3.start()
