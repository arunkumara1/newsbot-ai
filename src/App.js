import React, { useState , useEffect } from 'react';
import './App.css';
import NewCards from './components/NewCards/NewCards'
import  alanBtn  from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

const ALAN_SDK_KEY = '8231f664d02eb2ddeb2bc1664815f62d2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [ articles , setArticles ] = useState([]); 
    const [ activeArticles , setActiveArticles ] = useState(0); 


    useEffect(() => { 
      alanBtn({
        key: ALAN_SDK_KEY,
        onCommand: ({ command , articles , number }) => {
          if(command === 'newHeadlines') {
           console.log(articles);
           setArticles(articles);
          } else if(command === 'highlight') {
            setActiveArticles((prevActiveArticle) => prevActiveArticle + 1 );
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > 20) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
        }
      })
    },[]);

    return (
      <div className="App">
        <p className="App-intro">
            AI project
        </p>
        <NewCards articles={articles}/>
      </div>
    );
  }

export default App;
