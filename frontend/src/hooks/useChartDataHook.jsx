import { useEffect, useState } from "react";

const useChartDataHook = (arr, qty) => {
  const [obj, setObj] = useState({});
  useEffect(() => {
    const date = new Date();
    let month = new String(parseInt(date.getMonth()) + 1).padStart(2, 0);
    let year = parseInt(date.getFullYear());

    if (month - qty <= 0) {
      let resto = month - qty;
      // console.log(resto);
      year = year - 1;
      month = 12 - resto;
    } else {
      month -= 6;
      month = JSON.stringify(month).padStart(2, 0);
      // console.log(month);
    }
    const semestral = `${year}-${month}`;
    // console.log(semestral);
    // console.log(arr);

    const newArr = arr.filter((transaccion) => transaccion.fecha >= semestral);
    // console.log(newArr);
    const ingresosData = newArr.reduce((acc, curr) => {
      // console.log(curr);
      const date = new Date(curr.fecha);
      const month = String(date.getMonth() + 1).padStart(2, 0);
      const year = String(date.getFullYear());
      const key = `${year}-${month}`;
      const monto = parseInt(curr.monto);
      // console.log(acc);
      // console.log(key);
      // console.log(monto);
      if (acc[key]) {
        acc[key] += monto;
      } else {
        acc[key] = monto;
      }
      // console.log(acc);
      // console.log(monto);
      return acc;
    }, {});
    setObj(ingresosData);
  }, []);
  return obj;
};

export default useChartDataHook;
