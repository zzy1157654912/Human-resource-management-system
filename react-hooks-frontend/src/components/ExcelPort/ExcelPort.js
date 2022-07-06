
import React, {useState,useEffect} from "react";
import {Button, Upload} from "antd";
import * as XLSX from "xlsx";



const Excel = () => {
    const [data,setData] = useState([]);
    //导入模块
    const uploadProps= {
        //定义初始变量
        onRemove: file => {
            setData([]);
        },

        accept: ".xls,.xlsx,application/vnd.ms-excel",
        beforeUpload: (file) => {
            const _this = this;
            const f = file;
            const reader = new FileReader();
            reader.onload = function (e) {
                const datas = e.target.result;
                const workbook = XLSX.read(datas, {
                    type: 'binary'
                });
                const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];//是工作簿中的工作表的有序列表
                const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, {header: 1});//将工作簿对象转换为JSON对象数组
                const handleImpotedJson = (array, file) => {
                    // const formatTitleOrFileld = (a, b) => {
                    //     const entozh = {};
                    //         console.log()
                    //     return entozh;
                    // }
                    const header = array[1];//头部数据 ["姓名",...]
                    // const entozh = formatTitleOrFileld('title', 'dataIndex');//将表字段数组形式转化为对象形式,如：{"姓名":"name",...}
                    const firstRow = header;//可以获取到行属性 ["name",...]


                    const newArray = [...array];

                    newArray.splice(0, 1);//去除表头
                    // console.log(newArray)
                    const json = newArray.map((item, index) => {
                        const newitem = {};
                        item.forEach((im, i) => {
                            const newKey = firstRow[i] || i;

                            newitem[newKey] = im
                        })
                        return newitem;
                    });//将存在表头定义字段的值赋值
                    json.splice(0,1);
                    console.log(json);
                    //对应导入文件的标题，一一对应
                    const formatData = json.map(item => ({
                        name: item.姓名,
                        position: item.职位,
                        id: item.学号,
                        work: item.完成的任务,
                        tech: item.运用到的技术,
                        problem: item.遇到的问题及解决方法,
                        feel: item.总结心得,
                    }))//筛选出自己需要的属性
                    // console.log(formatData);
                    setData([...formatData]);
                    return formatData;
                }
                handleImpotedJson(jsonArr, file);
            };
            reader.readAsBinaryString(f);
            return false;
        },

    }
    //导出
    const handleExportAll = (e) => {
        //要求的数据格式
        const entozh = {
            "name":"姓名",
            "position":"职位",
            "id":"学号",
            "work":"完成的任务",
            "tech":"运用到的技术",
            "problem":"遇到的问题及解决",
            "feel":"总结心得",
        }
        //导出的具体json数据，有格式要求
        const nowdata = data;

        const json = nowdata.map((item) => {
            return Object.keys(item).reduce((newData, key) => {
                const newKey = entozh[key] || key
                newData[newKey] = item[key]
                return newData
            }, {})
        });


        const sheet = XLSX.utils.json_to_sheet(json);
        const openDownloadDialog = (url, saveName) => {
            if (typeof url == 'object' && url instanceof Blob) {
                url = URL.createObjectURL(url); // 创建blob地址
            }
            var aLink = document.createElement('a');
            aLink.href = url;
            aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
            var event;
            if (window.MouseEvent) event = new MouseEvent('click');
            else {
                event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            aLink.dispatchEvent(event);
        }
        const sheet2blob = (sheet, sheetName) => {
            sheetName = sheetName || 'sheet1';
            var workbook = {
                SheetNames: [sheetName],
                Sheets: {}
            };
            workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

            var wopts = {
                bookType: 'xlsx', // 要生成的文件类型
                bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                type: 'binary'
            };
            var wbout = XLSX.write(workbook, wopts);
            var blob = new Blob([s2ab(wbout)], {
                type: "application/octet-stream"
            }); // 字符串转ArrayBuffer
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }

            return blob;
        }

        openDownloadDialog(sheet2blob(sheet,undefined), `全部信息.xlsx`);

    }


    return (
        <div style={{display:"flex",marginLeft:"58vw"}}>
            <Upload {...uploadProps}>
                <Button type="primary" size={"large"} style={{marginRight:"2vw"}}>Excel导入</Button>
            </Upload>
            <Button type="primary" onClick={handleExportAll} size={"large"}>Excel导出数据</Button>
        </div>
    )
}

export default Excel