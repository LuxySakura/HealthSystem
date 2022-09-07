import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

function Lotus(district, street, detail, timestamp) {
    this.district = district;
    this.street = street;
    this.detail = detail;
    this.time = timestamp;
}

function Time(month, day, hour, minute) {
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
}

function renderRow(props) {
    const { index, style } = props;
    const lotusSet = [
        new Lotus('南岗区', '花园街道', '哈尔滨工业大学A01', new Time(9, 2, 14, 15)),
        new Lotus('南岗区', '西大直街', '哈尔滨工业大学A03', new Time(9, 2, 16, 15) ),
        new Lotus('南岗区', '西大直街', '哈尔滨工业大学明德楼', new Time(9, 3, 18, 15)),
        new Lotus('南岗区', '西大直街', '哈尔滨工业大学致知楼', new Time(9, 3, 12, 15)),
        new Lotus('南岗区', '西大直街', '哈尔滨工业大学正心楼', new Time(9, 4, 16, 15)),

        new Lotus('道里区', '经纬街', '商委红肠', new Time(9, 4, 18, 15)),
        new Lotus('道里区', '友谊路', '百盛购物中心', new Time(9, 4, 20, 20)),
        new Lotus('道外区', '嵩山路', '比利时啤酒屋', new Time(9, 5, 10, 45)),
        new Lotus('香坊区', '香电街', '群利食杂店', new Time(9, 5, 12, 56)),
        new Lotus('香坊区', '公滨路', '公滨百货商场', new Time(9, 6, 13, 37)),
    ]

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`${lotusSet[index].district}`} />
                <ListItemText primary={`${lotusSet[index].street}`} />
                <ListItemText primary={`${lotusSet[index].detail}`} />
                <ListItemText primary={`0${lotusSet[index].time.month}-0${lotusSet[index].time.day}-${lotusSet[index].time.hour}:${lotusSet[index].time.minute}`} />
            </ListItemButton>
        </ListItem>
    );
}

export default function VirtualizedList() {
    return (
        <Box
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                height={350}
                width={450}
                itemSize={46}
                itemCount={10}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}