import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';


import styled from "styled-components";
import { Button } from 'primereact/button';

const AdminContainer = styled.section`
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
    & .lado-a-lado {
      display: flex;
      justify-content: space-between;
      gap: 50px;
    }
    & .button {
      display: flex;
      justify-content: end;
    }
`

// const exportPdf = () => {
//     import('jspdf').then((jsPDF) => {
//         import('jspdf-autotable').then(() => {
//             const doc = new jsPDF.default(0, 0);

//             doc.autoTable(exportColumns, products);
//             doc.save('products.pdf');
//         });
//     });
// };

const Admin = () => {

  const [visitorMes, setVisitorMes] = useState({});
  const [mesOptions, setMesOptions] = useState({});
  const [visitorState, setvisitorState] = useState({});
  const [stateOptions, setstateOptions] = useState({});
  

  useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Visitas',
                    backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setVisitorMes(data);
        setMesOptions(options);
  }, ['']);

  useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--purple-600'), 
                        documentStyle.getPropertyValue('--purple-900'), 
                        documentStyle.getPropertyValue('--purple-200')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--purple-500'), 
                        documentStyle.getPropertyValue('--purple-800'), 
                        documentStyle.getPropertyValue('--purple-100')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%',
            aspectRatio: 1.5
        };

        setvisitorState(data);
        setstateOptions(options);
  }, []);

    return (
        <AdminContainer>
          <div className="content">
            {/* <div className="buttonPdf">
              <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div> */}
            <div className="button">
              <Button label="Baixar PDF" />
            </div>
            <div className="lado-a-lado">
              <div className="card">
                <div className="headerCard">
                  <h3>Total de visitas por mes</h3>
                </div>
                <Chart type="bar" data={visitorMes} options={mesOptions} />
              </div>
              <div className="card">
                <div className="headerCard">
                  <h3>Visitantes por estado</h3>
                </div>
                <Chart type="doughnut" data={visitorState} options={stateOptions} className="w-full md:w-30rem" />
              </div>
            </div>
            <div className="lado-a-lado">
              <div className="card">
                <div className="headerCard">
                  <h3>Visitas por cidades</h3>
                </div>
                <Chart type="bar" data={visitorMes} options={mesOptions} />
              </div>
              <div className="card">
                <div className="headerCard">
                  <h3>Visitantes por genero</h3>
                </div>
                <Chart type="doughnut" data={visitorState} options={stateOptions} className="w-full md:w-30rem" />
              </div>
            </div>
          </div>
        </AdminContainer>
    );
}

export default Admin;