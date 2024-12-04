import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';

const ExpenseLineChart = () => {
    const userData = useSelector((state) => state.userInfo.userData);
    const expenseList = userData.expenseList;

    // 데이터를 날짜별로 합산
    const dailyExpenses = expenseList.reduce((acc, expense) => {
        const date = expense.expenseAt.split('T')[0]; // YYYY-MM-DD 형식
        if (!acc[date]) {
            acc[date] = expense.amount; // 새로운 날짜 추가
        } else {
            acc[date] += expense.amount; // 기존 날짜에 금액 추가
        }
        return acc;
    }, {});

    // Nivo Line Chart 형식으로 변환
    const transformedData = [
        {
            id: 'Daily Expense',
            color: 'hsl(226,72%,45%)', // 임의의 색상
            data: Object.keys(dailyExpenses).map((date) => ({
                x: date, // 날짜
                y: dailyExpenses[date], // 합산 금액
            })),
        },
    ];

    return (
        <ResponsiveLine
            data={transformedData}
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
            yScale={{
                type: 'linear',
                min: 0, // 최소값 명시
                max: 'auto', // 최대값 자동
                stacked: false,
                reverse: false,
            }}
            axisBottom={{
                format: '%b %d', // 날짜 형식
                tickValues: 'every 1 days', // 매일 표시
                legend: '날짜',
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '지출 금액',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            pointSize={6}
            pointBorderWidth={1}
            enableSlices="x" // 확대 방지 및 슬라이스 활성화
            useMesh={false} // 터치 영역 비활성화
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
                },
            ]}
        />
    );
};

export default ExpenseLineChart;