import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";

function CardExpenseComparison(props) {
  const { data } = props;

  const iconMap = {
    housing: <Icon.House />,
    food: <Icon.Food />,
    transportation: <Icon.Transport />,
    entertainment: <Icon.Movie />,
    shopping: <Icon.Shopping />,
    others: <Icon.Other />,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <Card
          key={index}
          desc={
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center">
                  <div className="bg-special-bg text-gray-02 px-3 py-4 rounded-lg flex flex-col justify-center">
                    {iconMap[item.category.toLowerCase()] || <Icon.Other />}
                  </div>
                  <div className="ms-4">
                    <p className="text-gray-02 text-xs mb-1 capitalize">{item.category}</p>
                    <p className="font-bold text-xl">${item.amount}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-sm font-semibold">
                    <span className="text-gray-02 mr-1">{item.percentage}%</span>
                    {item.trend === "up" ? (
                      <div className="text-special-red"><Icon.ArrowUp size={16} /></div>
                    ) : (
                      <div className="text-special-green"><Icon.ArrowDown size={16} /></div>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-03 mt-1 text-right leading-tight">
                    Compare to the last month
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4 mt-auto">
                {item.detail.map((transaction, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-01">
                        {transaction.item}
                      </span>
                      <span className="text-[11px] text-gray-03">
                        {transaction.date}
                      </span>
                    </div>
                    <span className="font-bold text-sm text-gray-01">
                      ${transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
}

export default CardExpenseComparison;