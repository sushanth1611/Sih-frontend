import React, { useEffect, useRef, useState } from "react";
import { IndiaMap } from "../Components";
import { StatesXcolor, TEACHERS, TableVals } from "../constants";
import { ExploreC, SideBar } from "../layouts";
import { useTable, useSortBy } from "react-table";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  // ColumnInterface,
} from "recharts";
import styled from "styled-components";
function TeacherSTU() {
  const ref = useRef(null);
  const [Explore, setExplore] = useState(false);
  const [barHide, setbarHide] = useState(false);
  const [barHide2, setbarHide2] = useState(true);
  const [Current, setCurrent] = useState("");
  const [TEACHER, setTEACHER] = useState(TEACHERS);

  const Styles = styled.div`
    padding: 1rem;
    width: 1200px;
    // border-radius: 300px;
    table {
      border-spacing: 0;
      border: 1px solid #999999;

      tr {
        :last-child {
          td {
            border-bottom: 0;
            // border-radius: 300px;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid #999999;
        border-right: 1px solid #999999;

        :last-child {
          border-right: 0;
        }
      }
    }
  `;

  useEffect(() => {
    StatesXcolor.map((state) => {
      document.getElementById(
        state.State
      )!.style.fill = `rgba(${127} , ${0} , ${255} , ${
        Math.random() * 0.62 + 0.33
      })`;
    });
  }, []);

  const onScroll = () => {
    if (ref.current) {
      const { offsetHeight } = ref.current;
      const el = document.getElementById("#LETSGIVEITASHOT");
      const distanceFromTop = el?.getBoundingClientRect().top;
      // console.log();
      if (parseInt(distanceFromTop + offsetHeight) < 0) {
        setbarHide(true);
      } else {
        setbarHide(false);
      }
    }
  };
  const onLocationClick = (event: any) => {};

  const ChangeState = (State: string) => {
    // console.log(State, "SOCCUSS TRIFFY");
    if (Current !== State) {
      setCurrent(State);
      let temp = [];
      for (let i = 2000; i < 2023; i++) {
        // console.log();
        temp.push({
          year: i,
          TEACHERS: Math.floor(Math.random() * 5 + (i - 2000) / 3),
        });
      }
      setTEACHER(temp);
    }
  };
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: any;
    payload: any;
    label: any;
  }) => {
    // console.log(active, payload, label);

    if (active && payload && payload.length) {
      return (
        <div className='bg-gray-300 backdrop-blur-lg border-none  outline-none opacity-60 p-4'>
          <p className='label'>{`Teacher Ratio in ${Current} ${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  function Table({ columns, data }: { columns: any; data: any }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
        {
          columns,
          data,
        },
        useSortBy
      );

    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows;

    return (
      <>
        <table
          {...getTableProps()}
          className='text-slate-300 w-full rounded-2xl cursor-pointer'
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <span className='flex space-x-5 px-4'>
                      <div>{column.render("Header")}</div>
                      {/* Add a sort direction indicator */}

                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <div>&darr;</div>
                        ) : (
                          <div>&uarr;</div>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td
                        className='hover:bg-bgr2'
                        onMouseEnter={() =>
                          ChangeState(cell.row.original.States)
                        }
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <div>Showing the first 20 results of {rows.length} rows</div>
      </>
    );
  }
  const columns = React.useMemo(
    () => [
      {
        Header: "STATES",
        accessor: "States",
      },
      {
        Header: "PRIMARY EDUCATION",
        columns: [
          {
            Header: "STUDENTS",
            accessor: "PRIM_STU",
          },
          {
            Header: "TEACHERS",
            accessor: "PRIM_TEACH",
          },
        ],
      },
      {
        Header: "HIGH SCHOOL",
        columns: [
          {
            Header: "STUDENTS",
            accessor: "HIGH_STU",
          },
          {
            Header: "TEACHERS",
            accessor: "HIGH_TEA",
          },
        ],
      },
      {
        Header: "TECHNICAL EDU",
        columns: [
          {
            Header: "STUDENTS",
            accessor: "TECH_STU",
          },
          {
            Header: "TEACHERS",
            accessor: "TECH_TEACH",
          },
        ],
      },
    ],
    []
  );
  const TableVal = React.useMemo(() => TableVals, []);

  return (
    <div className='flex items-center bg-bgr overflow-hidden'>
      <ExploreC Explore={Explore} setExplore={setExplore} />
      <SideBar setExplore={setExplore} Explore={Explore} />
      {/* <Confetti active={animecon} config={config} /> */}
      <div
        className='h-screen overflow-x-hidden items-center flex flex-col  overflow-scroll   w-screen pt-6'
        onScroll={onScroll}
      >
        <div className='text-3xl text-slate-400 font-bold font-mono cursor-pointer  px-5 py-3 rounded-2xl hover:shadow-2xl hover:shadow-slate-600'>
          Teachers And Students Analytics
        </div>
        <div className='w-screen '>
          <div className=' flex'>
            <div className='w-4/12 h-2/5 m-20 sm:ml-40'>
              <IndiaMap
                hide={true}
                ChangeState={ChangeState}
                onLocationClick={onLocationClick}
              />
            </div>
            <div className=''>
              <div
                className='text-white    my-5  flex flex-col h-80   backdrop-blur-xl shadow-white letsSEE items-center space-y-6'
                style={{ backdropFilter: "20px" }}
              >
                <div className='py-3  text-3xl w-full flex justify-center border-b border-slate-400'>
                  Country Stats
                </div>
                {/* <div className='pt-3 inline-block'>Country Stats</div> */}
                <div className='flex justify-between w-full px-5'>
                  <div className='text-slate-300'>number of schools / km</div>
                  <div>2</div>
                </div>
                <div className='flex justify-between w-full px-5'>
                  <div className='text-slate-300'>number of Govt Schools</div>
                  <div>2k</div>
                </div>
                <div className='flex justify-between w-full px-5'>
                  <div className='text-slate-300'>
                    avg teachers for 30 students
                  </div>
                  <div>1.2</div>
                </div>
                <div className='flex justify-between w-full px-5'>
                  <div className='text-slate-300'>
                    Total count private schools
                  </div>
                  <div>10k</div>
                </div>
                <div className='flex justify-between w-full px-5'>
                  <div className='text-slate-300'>
                    please fill some random text
                  </div>
                  <div>10k</div>
                </div>
              </div>
              <div className='mt-12 border rounded-xl' ref={ref}>
                <ComposedChart
                  width={600}
                  height={300}
                  data={TEACHER}
                  margin={{
                    top: 20,
                    right: 80,
                    bottom: 20,
                    left: 20,
                  }}
                  id='#LETSGIVEITASHOT'
                >
                  <XAxis dataKey='year' className='text-white' scale='band'>
                    <Label color='#f5f5f5' offset={0} position='insideBottom'>
                      <div className='text-white'>Pages of my website</div>
                    </Label>
                  </XAxis>
                  <YAxis
                    label={{
                      value: "Index",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip content={<CustomTooltip active payload label />} />

                  <Bar
                    dataKey='TEACHERS'
                    barSize={20}
                    baseFrequency={5}
                    fill='#413ea0'
                  />
                  <Line type='monotone' dataKey='TEACHERS' stroke='#ff7300' />
                </ComposedChart>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center w-full'>
            <Styles>
              <Table columns={columns} data={TableVals} />
            </Styles>
            {/* <div className='py-96'>HI YO</div> */}
          </div>
        </div>
        <div
          className={`mt-12 border rounded-xl fixed bottom-5 right-10 backdrop-blur-xl ${
            barHide && barHide2 ? "" : "hidden"
          }`}
        >
          <div
            className='w-full justify-end flex text-2xl text-slate-300 pt-5 pr-5 cursor-pointer'
            onClick={() => setbarHide2(false)}
          >
            &#x2715;
          </div>
          <ComposedChart
            width={500}
            height={220}
            data={TEACHER}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
            id='#LETSGIVEITASHOT'
          >
            <XAxis dataKey='year' className='text-white' scale='band'>
              <Label color='#f5f5f5' offset={0} position='insideBottom'>
                <div className='text-white'>Pages of my website</div>
              </Label>
            </XAxis>
            <YAxis />
            <Tooltip content={<CustomTooltip active payload label />} />

            <Bar
              dataKey='TEACHERS'
              barSize={20}
              baseFrequency={5}
              fill='#413ea0'
            />
            <Line type='monotone' dataKey='TEACHERS' stroke='#ff7300' />
          </ComposedChart>
        </div>
      </div>
    </div>
  );
}

export default TeacherSTU;
