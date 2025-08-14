import React from 'react'
import '../../styles/InfoStockage.css'
import Partition from './Partition.jsx'
import { useCallback, useState } from "react";
import { PieChart, Pie, Sector} from "recharts";

const data = [
  { name: 'Disk C', value: 250 },
];

const data0 = [
  { name: 'Disk C', value: 0 }
]

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#000000f4">
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="#ffc400"
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill="#ffc400"
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#ffc400" fill="none" />
        <circle cx={ex} cy={ey} r={2} fill="#ffc400" stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#000000f4">{`${value} Go`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#000000f4">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
};


function InfoStockage({nameDisk, valueDisk}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

  return (
    <div className='bulle_section3'>
      <div className='texts_bulle_section3'>
        <span>System Storage</span>
        <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
      </div>
      <div className='partition_widget'>
          <div className='graph_partition_disque'>
            <span>
              Repartition of Storage Système
              <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
            </span>
            <PieChart width={360} height={205}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={valueDisk[0].value === '0' ? data0 : data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="rgb(210, 210, 210)"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </div>
          <div className="disposition_partition">
            <Partition partition={nameDisk ? nameDisk:""} valueDisk={valueDisk}/>
          </div>
      </div>
    </div>
  )
}


export default InfoStockage