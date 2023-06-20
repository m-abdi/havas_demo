export function toPersianDigit(oldString: string) {
  const find = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const replace = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let tempString = oldString;
  for (let i = 0; i < find.length; i++) {
    const regex = new RegExp(find[i], 'g');
    tempString = tempString?.replace?.(regex, replace[i]);
  }
  return tempString;
}
