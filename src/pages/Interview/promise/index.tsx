import { Button } from 'antd';
import { useEffect, useState } from 'react';
import MyPromise from './custom-promise';
type Props = object;

function getRandom(): number {
  return Math.random();
}

export default function TestMyPromise({}: Props) {
  const [okText, setOkText] = useState<string[]>([]);
  const [myPromiseText, setMyPromiseText] = useState<string[]>([]);
  const [promiseText, setPromise] = useState<string[]>([]);

  const testMyPromise = () => {
    const p = new MyPromise<any>((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = getRandom();
        if (randomNumber > 0.5) {
          resolve(randomNumber);
        } else {
          console.log(randomNumber + '< 0.5');
          reject(`MyPromise Error: ${randomNumber}, less than 0.5`);
        }
      }, 500);
    });
    p.then((value) => {
      const t = `MyPromise:Fulfilled1:${value}`;
      console.log(t);
      myPromiseText.push(t);
      setMyPromiseText(myPromiseText);
      return value * 2;
    })
      .then((value) => {
        const t = `MyPromise:Fulfilled2:${value}`;
        console.log(t);
        myPromiseText.push(t);
        setMyPromiseText(myPromiseText);
      })
      .catch((reason: any) => {
        const errorText = reason;
        console.error(errorText);
        myPromiseText.push(errorText);
        setMyPromiseText(myPromiseText);
      });
  };

  const testPromise = () => {
    const p2 = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = getRandom();
        console.log('P2:', randomNumber);
        if (randomNumber > 0.5) {
          resolve(randomNumber);
        } else {
          reject(`Promise Error: ${randomNumber}, less than 0.5`);
        }
      }, 500);
    });
    p2.then((value) => {
      const t = `Promise:Fulfilled1:${value}`;
      console.log(t);
      promiseText.push(t);
      setPromise(promiseText);
      return value * 2;
    })
      .then((value) => {
        const t = `Promise:Fulfilled2:${value}`;
        console.log(t);
        promiseText.push(t);
        setPromise(promiseText);
      })
      .catch((reason: any) => {
        const errorText = reason;
        console.error(errorText);
        promiseText.push(errorText);
        setPromise(promiseText);
      });
  };

  const test = (): void => {
    okText.push(Date.now() + '');
    console.log(okText);
    setOkText(okText);
  };

  useEffect(() => {
    console.log('text:', okText);
    console.log('text promise:', promiseText);
    console.log('text myPromiseText:', myPromiseText);
  }, [okText, promiseText, myPromiseText]);

  // 渲染数组
  function renderText(textArr: string[]) {
    return textArr.map((t, index) => {
      return <div key={index}>{t}</div>;
    });
  }
  return (
    <div>
      <div>my promise:</div>
      <br></br>
      <Button onClick={test}>test</Button>
      <div>okText:{renderText(okText)}</div>
      <br></br>
      <Button onClick={testMyPromise}>mypromise</Button>
      <div>okTextPromise:{renderText(myPromiseText)}</div>
      <br></br>
      <Button onClick={testPromise}>promise2</Button>
      <div>okPromise: {renderText(promiseText)}</div>
    </div>
  );
}
