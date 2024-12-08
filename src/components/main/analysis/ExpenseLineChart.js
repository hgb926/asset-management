import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';

const ExpenseLineChart = () => {
    const userData = useSelector((state) => state.userInfo.userData);
    const expenseList = userData.expenseList;
    const incomeList = userData.incomeList;
    const initialMoney = userData.currentMoney;

    // 날짜별 지출 합산
    const dailyExpenses = expenseList.reduce((acc, expense) => {
        const date = expense.expenseAt.split('T')[0]; // YYYY-MM-DD 형식
        if (!acc[date]) {
            acc[date] = expense.amount;
        } else {
            acc[date] += expense.amount;
        }
        return acc;
    }, {});

    // 날짜별 수입 합산
    const dailyIncome = incomeList.reduce((acc, income) => {
        const date = income.incomeAt.split('T')[0];
        if (!acc[date]) {
            acc[date] = income.amount;
        } else {
            acc[date] += income.amount;
        }
        return acc;
    }, {});

    // 날짜 정렬
    const allDates = Array.from(
        new Set([
            ...Object.keys(dailyExpenses),
            ...Object.keys(dailyIncome),
        ])
    ).sort();

    // 날짜별 currentMoney 계산
    let runningBalance = initialMoney;
    const currentMoneyData = allDates.map((date) => {
        const income = dailyIncome[date] || 0;
        const expense = dailyExpenses[date] || 0;
        runningBalance += income - expense;
        return { x: date, y: runningBalance };
    });

    // 하루별 총 지출 데이터 변환
    const dailyExpenseData = allDates.map((date) => ({
        x: date,
        y: dailyExpenses[date] || 0, // 해당 날짜 지출이 없으면 0
    }));

    // Nivo Line Chart 형식으로 변환
    const transformedData = [
        {
            id: '잔액',
            color: 'hsl(220, 70%, 50%)',
            data: currentMoneyData,
        },
        {
            id: '하루 총 소비',
            color: 'hsl(10, 70%, 50%)',
            data: dailyExpenseData,
        },
    ];

    return (
        <div style={{height: '450px', width: '100%', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}}>
            <ResponsiveLine
                data={transformedData}
                margin={{top: 50, right: 200, bottom: 100, left: 100}}
                xScale={{type: 'time', format: '%Y-%m-%d', precision: 'day'}}
                yScale={{type: 'linear', min: 0, max: 'auto', stacked: false}}
                axisBottom={{
                    format: '%m-%d',
                    tickValues: 'every 1 days',
                    legend: '날짜',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    legendItemHeight: "28"
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '금액 (원)',
                    legendOffset: -40,
                    legendPosition: 'top',

                }}
                pointSize={6}
                pointColor="white"
                pointBorderWidth={2}
                pointBorderColor={{from: 'serieColor'}}
                enableSlices="x"
                useMesh={true}
                colors={{ scheme: "tableau10"}}

                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 10,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                    },
                ]}
            />
        </div>
    );
};

export default ExpenseLineChart;