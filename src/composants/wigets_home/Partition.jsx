import React from 'react';
import '../../styles/Partition.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Partition({partition, valueDisk}){

    let data = [];
    
    switch(partition){
        case "C:":
            data = { name: 'Disque C', 
                value: valueDisk.length !== 3 ? valueDisk[0].value : 0, 
                used:  valueDisk.length !== 3 ? valueDisk[1].value : 0, 
                percent:   valueDisk.length !== 3 ? valueDisk[2].value : 0, 
                free:  valueDisk.length !== 3 ? valueDisk[3].value : 0
            }
            break;
        case "D":
            data = { name: 'Disque D', value: 330, used: 208, percent: 63.03, free: 122}
            break;
        case "E":
            data = { name: 'Disque E', value: 210, used: 80, percent: 38.09, free: 120}
            break;
        default:
            break;
    }

    return (
        <div className='graph_partition_infos'>
            <div className='texts_partitions'>
                <span>Disk {partition}</span>
                <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
            </div>
            <div className="infos_partition">
                <div className='graph_infos' >
                    <span>Disk used graph</span>
                    <div style={{ width: 100, height: 100 }}>
                        <CircularProgressbar 
                            value={data.percent} 
                            maxValue={100} 
                            text={`${data.percent} %`} 
                            strokeWidth={10}
                            styles={buildStyles({
                                textColor: '#000000f4',
                                pathColor: "#ffc400"
                            })}
                        />
                    </div>
                    <div className='text_infos'>
                        <span>
                            <div style={{height: "5px", background: "#ffc400", width: "5px", borderRadius:"100%"}}></div>
                            Total : {data.value} Go
                        </span>
                        <span>
                            <div style={{height: "5px", background: "#ffc400", width: "5px", borderRadius:"100%"}}></div>
                            Used : {data.used} Go
                        </span>
                        <span>
                            <div style={{height: "5px", background: "#ffc400", width: "5px", borderRadius:"100%"}}></div>
                            Percent : {data.percent}%
                        </span>
                        <span>
                            <div style={{height: "5px", background: "#ffc400", width: "5px", borderRadius:"100%"}}></div>
                            Free : {data.free} Go
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Partition