import * as C from './App.styles';
import logoImage from './assets/Naruto_logo.svg.png';
import RestartIcon from './svgs/restart.svg';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
import './index.css';


const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if(showCount === 2){
      let opened = gridItems.filter(item => item.shown === true);
        if(opened.length === 2){
          if(opened[0].item === opened[1].item){
            let tmpGrid = [...gridItems];
            for(let i in tmpGrid){
              if(tmpGrid[i].shown){
                tmpGrid[i].permanentShown = true;
                tmpGrid[i].shown = false;
              }
            }  
            setGridItems(tmpGrid);
            setShowCount(0);
          } else {
            setTimeout(() => {
              let tmpGrid = [...gridItems];
              for(let i in tmpGrid){
                tmpGrid[i].shown = false;
              }
              setGridItems(tmpGrid);
              setShowCount(0);
            }, 1000);
          }
          

            setMoveCount(moveCount => moveCount + 1);
        }
    }
  }, [showCount, gridItems]);

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  }, [moveCount, gridItems]);


  const resetGrid = () =>{
    // resetar
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    // criar o grid
    let tmpGrid: GridItemType[] =[];
    for(let i = 0; i < (items.length * 2); i ++) tmpGrid.push({
      item: null, shown: false, permanentShown: false });

      //preencher o grid
      for(let w = 0; w < 2; w++){
        for(let i = 0; i < items.length; i++){
          let pos = -1;
          while(pos < 0 || tmpGrid[pos].item !== null){
            pos = Math.floor(Math.random() * ( items.length * 2));
          }
          tmpGrid[pos].item = i;
        }
      }
      //jogar no state
    setGridItems(tmpGrid)
      //começar o jogo
    setPlaying(true);
  }

  const itemClick = (index: number) => {
      if(playing && index !== null && showCount < 2) {
        let tmpGrid = [...gridItems];
        if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false){
          tmpGrid[index].shown = true;
          setShowCount(showCount + 1);
        }
        setGridItems(tmpGrid);
      }
  }

  return(
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImage} width="150" alt='' />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label="Movimentos" value={moveCount.toString()}/>
        </C.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetGrid} />
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem 
              key={index}
              item={item}
              onClick={() => itemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App;