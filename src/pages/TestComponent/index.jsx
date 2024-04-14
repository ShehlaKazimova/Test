import React, { useState } from 'react';

const TestComponent = () => {
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [answers, setAnswers] = useState(Array(30).fill(null));
  const [setCompleted, setSetCompleted] = useState([false, false, false]);
  const [errors, setErrors] = useState(Array(30).fill(false));

  const handleRadioChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    const newErrors = [...errors];
    newErrors[index] = false;
    setErrors(newErrors);
  };

  const levelOptions = ['a', 'b', 'c', 'd', 'e'];

  const nextQuestions = () => {
    const startIndex = currentQuestionSet * 10;
    const endIndex = (currentQuestionSet + 1) * 10;
    const subsetAnswers = answers.slice(startIndex, endIndex);
    if (subsetAnswers.some(answer => answer === null)) {
      const newErrors = [...errors];
      subsetAnswers.forEach((answer, index) => {
        if (answer === null) {
          newErrors[startIndex + index] = true;
        }
      });
      setErrors(newErrors);
      return;
    }
    setCurrentQuestionSet(currentQuestionSet + 1);
    setSetCompleted([...setCompleted.slice(0, currentQuestionSet), true, ...setCompleted.slice(currentQuestionSet + 1)]);
    window.scrollTo(0, 0); // Scroll to the top
  };



  const prevQuestions = () => {
    setCurrentQuestionSet(currentQuestionSet - 1);
    window.scrollTo(0, 0); // Scroll to the top

  };

  const submitAnswers = () => {
    const startIndex = currentQuestionSet * 10;
    const endIndex = (currentQuestionSet + 1) * 10;
    const subsetAnswers = answers.slice(startIndex, endIndex);
    if (subsetAnswers.some(answer => answer === null)) {
      const newErrors = [...errors];
      subsetAnswers.forEach((answer, index) => {
        if (answer === null) {
          newErrors[startIndex + index] = true;
        }
      });
      setErrors(newErrors);
      return;
    }
    console.log(answers);
  };

  const questions = [
    "Sən yeni insanlarla tanışmağa marağı olan biri misiniz?",
    "Bir probleminiz olduğunda, hansı seçimi daha çox seçərdiniz?",
    "Bir sosial tədbirdə, siz necə davranırsınız?",
    "Bir proyekt üzərində işlərkən, sizin üstünüzlə əlaqə qurmaqda olan tərəflərinizdə necə davranırsınız?",
    "Bir problem çıxandan sonra, ilk axtardığınız şey nə olur?",
    "Yeni vəziyyətlər və məsələlər qarşısında necə davranırsınız?", "Həyatınızda daim məqsədləriniz və planlarınız var?",
    "Dostlarınızla vaxt keçirməyi necə qiymətləndirirsiniz?", "Yeni iş və təcrübələrə açıq mısınız?",
    "Bir insanın fikir və düşüncələrini öyrənmək üçün hansı metodları tərəf edərdiniz?"
  ];

  const trueOptions = ['Bəli',
    'Paylaşmaq', 'Fəaliyyətdə oluram', 'Sıx əlaqədə oluram', 'Özüm həll edirəm', 'Sevə-Sevə qarşılayıram', 'Bəli',
    'Çox vacibdir', 'Bəli', 'Onun fikirlərini dinləmək',]; // Example options
  const falseOptions = [' Xeyr',
    'Yalnız olmaq', 'Geri planda qalıram', 'Fikirlərimi qoruyuram', 'Başqalarının köməyini axtarıram'
    , 'Qaçıram', ' Xeyr', 'Yalnız olmağı tərəccüb edirəm', ' Xeyr', 'Öz fikirlərinizi bölüşmək',];

  const renderQuestions = () => {
    const startIndex = currentQuestionSet * 10;
    const endIndex = Math.min((currentQuestionSet + 1) * 10, 30);
    const renderedQuestions = [];

    for (let i = startIndex; i < endIndex; i++) {
      const isSelected = answers[i] !== null;
      const contentStyle = {
        paddingBottom: 35,
        paddingTop: 10,
        width: '92.5%',
        margin: 'auto',
        backgroundColor: isSelected ? '#a9a9a92e' : '#fff',
        marginBottom: isSelected ? '7px' : '0',
        border: errors[i] ? '1px solid red' : '1px solid transparent' // Conditionally set border style
      };

      const trueLabel = trueOptions[i % trueOptions.length];
      const falseLabel = falseOptions[i % falseOptions.length];

      renderedQuestions.push(
        <div className='content' style={contentStyle} key={i}>
          <p className='test-quiz'>{questions[i % 10]}</p>
          <div className='input'>
            <p style={{ paddingRight: 35, fontSize: '18px', width: "22%", fontWeight: 600, color: '#404f69' }}>{trueLabel}</p>
            <div className='input-flex'>
              {levelOptions.map((option, j) => (
                <label key={j} style={{ cursor: 'pointer' }} className='container'>
                  <input
                    type="radio"
                    value={option}
                    checked={answers[i] === option}
                    onChange={() => handleRadioChange(i, option)}
                    className="no-hover"
                  />
                  <span class="checkmark"></span>
                </label>
              ))}
            </div>
            <p style={{ paddingLeft: 35, fontSize: '18px', width: "22%",fontWeight: 600, color: '#404f69' }}>{falseLabel}</p>
          </div>
        </div>
      );
    }

    return renderedQuestions;
  };



  return (
    <div>
      <h2>SON 30 GÜNDƏ 973.578 TEST KEÇİRİLİB.</h2>
      <p className='style-p'>Bu pulsuz əxsiyyət testi sizə 9 şəxsiyyət növündən hansının sizə ən uyğun olduğunu göstərəcək. Bütün 9 Şəxsiyyət növü üçün necə xal qazandığınıza baxın və  şəxsiyyət sistemində harada yerləşdiyinizi anlayın.</p>
      <div>
        <h3>ŞƏXSİYYƏT TESTİNDƏN KEÇMƏK ÜÇÜN HƏR BƏYANATI SİZİN ŞƏXSİYYƏTİNİZİ NECƏ DƏRƏCƏ TƏSVİR EDİLMƏSİ ƏSASINDA QEYD EDİN.</h3>
        <form>
          {renderQuestions()}
        </form>
        <div className='button-flex'>
          {currentQuestionSet > 0 && <button onClick={prevQuestions}>Previous</button>}
          {currentQuestionSet < 2 && <button className='button-next' onClick={nextQuestions}>Next</button>}
          {currentQuestionSet === 2 && <button  className='button-next' onClick={submitAnswers}>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
