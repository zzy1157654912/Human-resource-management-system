import { Badge, Calendar } from 'antd';
import React from 'react';
//切换中文
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
import LeftSide from "../leftSide/LeftSide";
moment.locale('zh-cn')




const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: 'warning',
                    content: '提醒1',
                }
            ];
            break;

        case 10:
            listData = [
                {
                    type: 'warning',
                    content: '聚餐',
                },
                {
                    type: 'success',
                    content: '游戏时间',
                },
            ];
            break;

        case 15:
            listData = [
                {
                    type: 'warning',
                    content: '会议1',
                },
                {
                    type: 'success',
                    content: '达成工作目标',
                }
            ];
            break;

        default:
    }

    return listData || [];
};

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
const Jcalendar = () => {
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <div style={{display:"flex"}}>
            <div style={{width:"85vw"}}>
                <h3 style={{marginLeft:"2vw",marginTop:"2vw"}}>工作日历表</h3>
                <Calendar dateCellRender={dateCellRender}
                          monthCellRender={monthCellRender}
                          fullscreen={false}
                          locale={locale}
                />
            </div>

        </div>
    )
}

export default Jcalendar;