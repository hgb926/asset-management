import React from 'react';
import {useSelector} from "react-redux";
import { ResponsiveLine } from '@nivo/line'

const ExpenseLineChart = () => {

    const userData = useSelector(state => state.userInfo.userData);
    const expenseList = userData.expenseList;

    const transformedData = expenseList.reduce((result, expense) => {
        const categoryIndex = result.findIndex(item => item.id === expense.category);
        if (categoryIndex === -1) {
            result.push({
                id: expense.category,
                color: "hsl(65, 70%, 50%)", // 임의의 색상
                data: [
                    {
                        x: expense.expenseAt.split("T")[0], // 날짜 부분만 추출
                        y: expense.amount
                    }
                ]
            });
        } else {
            const dateIndex = result[categoryIndex].data.findIndex(item => item.x === expense.expenseAt.split("T")[0]);
            if (dateIndex === -1) {
                result[categoryIndex].data.push({
                    x: expense.expenseAt.split("T")[0],
                    y: expense.amount
                });
            } else {
                result[categoryIndex].data[dateIndex].y += expense.amount;
            }
        }
        return result;
    }, []);

    console.log(transformedData);
    // 렌더링 안됨.

    return (
        <ResponsiveLine
            data={transformedData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};

export default ExpenseLineChart;