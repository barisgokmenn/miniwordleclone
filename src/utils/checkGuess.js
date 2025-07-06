export function checkGuess(guess, answer) {
  const result = Array(5).fill(null).map((_, i) => ({
    letter: guess[i],
    status: 'absent',
  }));

  const answerLetters = answer.split('');

  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      result[i].status = 'correct';
      answerLetters[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i].status === 'correct') continue;
    const index = answerLetters.indexOf(guess[i]);
    if (index !== -1) {
      result[i].status = 'present';
      answerLetters[index] = null;
    }
  }

  return result;
}
