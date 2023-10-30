import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend } from "recharts";
import {
  fetchAllPieCharts,
  fetchListOfResults,
  fetchTop10Desc,
  fetchTop10Asc,
} from "../store/fetchs";
import { useEffect } from "react";

function Charts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPieCharts());
    dispatch(fetchListOfResults());
    dispatch(fetchTop10Desc());
    dispatch(fetchTop10Asc());
  }, [dispatch]);

  const allPieCharts = useSelector((state) => state.objects.allPieCharts);
  const listOfResults = useSelector((state) => state.objects.listOfResults);
  const top10Desc = useSelector((state) => state.objects.top10Desc);
  const top10Asc = useSelector((state) => state.objects.top10Asc);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="diagrams">
        <div>
        <h2>{listOfResults.title}</h2>

        <div style={{ width: "100%" }} className="diagrams-item">
          <div className="answers-card">
            <div className="answear-heads-card" style={{ width: "100%" }}>
              <p style={{ width: "20%" }}>Id</p>
              <p style={{ width: "30%" }}>Place name</p>
              <p style={{ width: "50%" }}>Most Answer</p>
            </div>
            {listOfResults.data &&
              listOfResults.data.map((item, index) => {
                return (
                  <div key={index} className="answers-info">
                    <p style={{ width: "20%" }}>{item.id}</p>
                    <p style={{ width: "30%" }}>
                      <span style={{ backgroundColor: item.color }}>
                        {item.label}
                      </span>
                    </p>
                    <p style={{ width: "50%" }}>{item.answer}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <h2>{allPieCharts.title}</h2>

        <div className="diagrams-item pie" style={{height:'500px'}}>
          <PieChart width={600} height={400}>
            <Pie
              data={allPieCharts.data}
              cx={300}
              cy={200}
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="vote"
              nameKey="label"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {allPieCharts.data &&
                allPieCharts.data.map((entry, index) => (
                  <Cell key={index} fill={getRandomColor()} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <div>
        <h2>{top10Desc.title}</h2>

        <div className="diagrams-item" >
          <BarChart
            width={900}
            height={300}
            data={top10Desc.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vote" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
      <div>
        <h2>{top10Asc.title}</h2>
        <div className="diagrams-item">
          <BarChart
            width={900}
            height={300}
            data={top10Asc.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vote" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
      
    </div>
  );
}

export default Charts;
