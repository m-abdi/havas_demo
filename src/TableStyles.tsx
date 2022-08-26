import styled from 'styled-components';

export default styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;
    text-align: center;
    font-family: Vazir;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
    .thead {
      background-color: #68c5db;
    }
    .th {
      font-weight: bold;
      font-size: calc(12.5px + (21 - 14) * ((100vw - 300px) / (1600 - 300)));
    }
    .td {
      overflow: hidden;
      font-size: calc(12px + (17 - 14) * ((100vw - 300px) / (1600 - 300)));
    }
    .th {
      padding-inline: 0.2rem;
      padding-block: 0.3rem;
      margin: 0;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-align: center;
      .resizer {
        display: inline-block;
        background: #fcde67;
        width: 3px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
    .td {
      margin: 0;
      padding: 5px;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      display: flex !important;
      align-items: center;
      justify-content: center;

      ${
        '' /* In this example we use an absolutely position resizer,
   so this is required. */
      }
      position: relative;

      :last-child {
        border-left: 0;
      }

      .resizer {
        display: inline-block;
        background: #fcde67;
        width: 3px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;
