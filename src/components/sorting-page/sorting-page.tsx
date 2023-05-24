import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';

export type TNumber = Array<{
  number: number
  color: string
}>

export const SortingPage: React.FC = () => {
  let [array, setArray] = useState<TNumber>([]);
  const [value, setValue] = useState<string>('1');
  const [loader, setLoader] = useState<string>('');
  const [isShownTimeout, setIsShownTimeout] = useState<boolean>(false);

  const newArr = () => {
    setLoader('2')
    setArray(array = []);
    randomInteger()
    randomArr()
    setLoader('')
  }

  function randomInteger() {
    return Math.floor(Math.random() * (18 - 3 + 1)) + 3;
  }
  const maxArrElement = randomInteger();
  const randomArr = () => {
    if(maxArrElement > 3){
      for (let index = 0; index < maxArrElement; index++) {
        array?.push({number: Math.floor(Math.random() * 101), color: 'default'});
        setArray([...array])
      }
    }
    else{
      for (let index = 0; index < 3; index++) {
        array?.push({number: Math.floor(Math.random() * 101), color: 'default'});
        setArray([...array])
      }
    }
  }
  useEffect( () => {
    randomArr()
  },[])
  const delay = (delay: number) => new Promise((resolve) => setInterval(resolve, delay));

  const increase = () => {
    setLoader('0')
    setIsShownTimeout(true)
    if(value === '1'){
      selectionSort(array, true)
    }
    if(value === '2'){
      bubbleSort(array, true)
    }
  }
  const decrease = () => {
    setLoader('1')
    setIsShownTimeout(true)
    if(value === '1'){
      selectionSort(array, false)
    }
    if(value === '2'){
      bubbleSort(array, false)
    }
  }

  const selectionSort = async (array: TNumber, ascending: boolean) => {
    for (let i = 0; i < array.length; i++) {
      let indexMin = i;
      for (let j = i+1; j < array.length; j++) {
        await delay(300)
        if(ascending){
          if(array[j].number > array[indexMin].number){
            indexMin = j
          }
          array[j].color = array[i].color ='changing';
          if (j - i > 1) {
            array[j - 1].color = 'default'
          }
          setArray([...array]);
        } 
        else {
          if(array[j].number < array[indexMin].number){
            indexMin = j
          }
          array[j].color = array[i].color ='changing';
          if (j - i > 1) {
            array[j - 1].color = 'default'
          }
          setArray([...array]);
        }
        
      }
      let tmp = array[i];
      array[i] = array[indexMin]
      array[indexMin] = tmp
      array[array.length - 1].color = 'default'
      array[i].color ='modified';
      setArray([...array])
    }
    setLoader('')
    setIsShownTimeout(false)
    return array
  };
  
  const bubbleSort = async (array: TNumber, ascending: boolean) => {
    const end = array.length - 1;
    for (let i = 0; i < end; i++) {
      for (let j = 0; j < end - i; j++) {
        if(ascending){
          if(array[j + 1].number > array[j].number){
            await delay(500)
            let tmp = array[j]
            array[j] = array[j + 1]
            array[j + 1] = tmp
            setArray([...array]);
          }
          array[j].color = array[j + 1].color = 'changing';
          if (j !== 0) {
            array[j - 1].color = 'default'
          }
          if (j === end - i - 1) {
            array[j].color = 'default'
            array[j + 1].color = 'modified'
          }
          setArray([...array]);
        }
        else{
          if(array[j + 1].number < array[j].number){
            await delay(500)
            let tmp = array[j]
            array[j] = array[j + 1]
            array[j + 1] = tmp
            setArray([...array]);
          }
          array[j].color = array[j + 1].color = 'changing';
          if (j !== 0) {
            array[j - 1].color = 'default'
          }
          if (j === end - i - 1) {
            array[j].color = 'default'
            array[j + 1].color = 'modified'
          }
          setArray([...array]);
        }
        
      }
      setArray([...array]);
    }
    array[0].color = 'modified';
    setArray([...array]);
    setLoader('')
    setIsShownTimeout(false)
    return array
  };
  enum Direction {
    Ascending = "ascending",
    Descending = "descending",
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.input}>
        <RadioInput label={'Выбор'} checked={value === '1' ? true : false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue((e.target.value))} value={'1'} />
        <RadioInput label={'Пузырёк'} extraClass={styles.radio} checked={value === '2' ? true : false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue((e.target.value))} value={'2'} />
        <Button isLoader={loader === '0'? true: false} extraClass={`${styles.btnLeft} ${styles.btn}`} disabled={isShownTimeout} text='По возрастанию' onClick={() => increase()} sorting={Direction.Ascending} />
        <Button isLoader={loader === '1'? true: false} extraClass={`${styles.btn}`} disabled={isShownTimeout} text='По убыванию' onClick={() => decrease()} sorting={Direction.Descending}/>
        <Button isLoader={loader === '2'? true: false} disabled={isShownTimeout} extraClass={`${styles.btnNewArr} ${styles.btn}`} text='Новый массив' onClick={() => newArr()}/>
      </div>
      <ul className={styles.column}>
          {array?.map(({number, color}, index) => {
            return (
              <li key={index} style={{margin: '10px'}}><Column  state={color}  index={number} key={index} /></li>
            )
          })}
        </ul>
    </SolutionLayout>
  );
};

/* const swap = (arr: TNumber, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    
  }
  const bubbleSort = (arr: TNumber, ascending?: boolean) => {
    let i = 0;
    let j = 0;
    let interval: NodeJS.Timeout;
    const end = array.length - 1;

    interval = setInterval(() => {
      if (i < end) {
        if (j < end - i) {
          if (ascending) {
            if (array[j].number > array[j + 1].number) {
              swap(array, j, j + 1);
              setArray([...array]);
            }
          } else {
            if (array[j].number < array[j + 1].number) {
              swap(array, j, j + 1)
              setArray([...array])
            }
          }

          array[j].color = array[j + 1].color = 'changing';
          if (j !== 0) {
            array[j - 1].color = 'default'
          }
          if (j === end - i - 1) {
            array[j].color = 'default'
            array[j + 1].color = 'modified'
          }
          setArray([...array]);

          j++
        } else {
          j = 0
          i++
        }
      } else {
        array[0].color = 'modified';
        setArray([...array]);
        clearInterval(interval)
      }
    }, 200)
  } */
