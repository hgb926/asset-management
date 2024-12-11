import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";


const IncomeReport = () => {
    const userData = useSelector((state) => state.userInfo.userData);

    // 방어 코드: userData 또는 incomeList가 없을 때 기본값 설정
    const incomeList = userData?.incomeList || [];

    // 데이터 변환: 카테고리별 그룹화
    const pieData = incomeList.reduce((acc, item) => {
        const existingCategory = acc.find((data) => data.id === item.category);
        if (existingCategory) {
            existingCategory.value += item.amount;
        } else {
            acc.push({
                id: item.category,
                label: item.category,
                value: item.amount,
            });
        }
        return acc;
    }, []);

    const limitedData = pieData.slice(0, 4);

    return (
        <div style={{ height: 240 }}>
            <ResponsivePie
                data={limitedData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.1]],
                }}
                colors={["#ACC9E8", "#FFC9B9", "#F8E9A1", "#C5E1A5"]} // 동일한 파스텔톤 색상
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 70,
                        itemHeight: 18,
                        itemTextColor: "#555",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: "#000",
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default IncomeReport;