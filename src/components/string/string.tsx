import React, {useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  type TString = Array<{
    string: string;
    color: string
  }>
  const [isShownTimeout, setIsShownTimeout] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  let [array, setArray] = useState<TString>([]);
  const delay = (delay: number) => new Promise((resolve) => setInterval(resolve, delay));
  let [mid, setMid] = useState<number>(0);

  const string = (value: string) => {
    setArray(array = [])
    setIsShownTimeout(true)
    const ms = value.split('')
    ms.map(e => {
      array?.push({string: e, color: 'default'})
    })
    setValue('')
    let start = 0;
    let end = array.length - 1;
    rec(start, end)
  }
  const rec = async (start: number, end: number): Promise<number> => {
    setMid(mid = Math.floor(array.length / 2));
    if(start >= end){
      setIsShownTimeout(false)
      return 1
    }
    await delay(500)
    let tmp = array[start];
    array[start] = array[end]
    array[start].color = array[end].color = 'modified'
    array[end] = tmp
    array[end].color = tmp.color = 'modified'
    if(start + 1 === mid){
      array[mid].color = 'modified'
    }
    setArray([...array])
    return rec(start + 1, end - 1)
  }
  return (
    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <Input placeholder="Введите текст" value={value} isLimitText={true} maxLength={11} onChange={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)} type="text" />
        <Button disabled={value === '' ? true : false} text={'Развернуть'} onClick={() => string(value)} isLoader={isShownTimeout}/>
      </div>
      <ul className={styles.circle}>
        {array?.map(({string, color}, index) => {
          return (
            <li key={index}><Circle data-testid="text-in-circle" state={color} letter={string} key={index}/></li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
