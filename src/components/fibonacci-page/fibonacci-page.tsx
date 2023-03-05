import React, {useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css'

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number>(NaN);
  const [isShownTimeout, setIsShownTimeout] = useState<boolean>(false);
  let [arrayFibn, setArrayFibn] = useState<number[]>([]);
  const delay = (delay: number) => new Promise((resolve) => setInterval(resolve, delay));

  const fibonacciZeroOne = async (n: number) => {
    setArrayFibn(arrayFibn = [])
    setIsShownTimeout(true)
    for (let i = 0; i <= 1; i++) {
      await delay(500)
      arrayFibn.push(1)
      setArrayFibn([...arrayFibn])
    }
    fibonachi(n)
  }

  const fibonachi = async (n: number) => {
    let a = 1;
    let b = 1;
    for (let i = 2; i <= n; i++) {
      
      await delay(500)
      let c = a + b;
      a = b;
      b = c;
      arrayFibn.push(b)
      setArrayFibn([...arrayFibn])
    }
    setValue(NaN)
    setIsShownTimeout(false)

    return b;
  }
  
  const validation = ((value! > 19) || (value! < 0)) ? true : false;
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div className={styles.input}>
        <Input value={value} max={19} isLimitText={true} type='number' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}/>
        <Button text={'Развернуть'} isLoader={isShownTimeout} onClick={() => fibonacciZeroOne(value!)} disabled={validation} />
      </div>
      <ul className={styles.circle}>
          {arrayFibn?.map((number, index) => {
            return (
              <li key={index}>< Circle index={index} letter={number + ''} key={index} /></li>
            )
          })}
        </ul>
    </SolutionLayout>
  );
};
