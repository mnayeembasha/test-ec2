const express = require('express');
const app = express();
const PORT = 8081;

app.get("/",(req,res)=>{
   res.status(200).json({message:"Welcome to Calculator App"});
});


// Example URL: http://localhost:8081/calculate?num1=10&num2=5&operation=add
app.get('/calculate', (req, res) => {
  const { num1, num2, operation } = req.query;

  // Convert query params to numbers
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  // Validation
  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).json({ error: 'Both num1 and num2 must be valid numbers' });
  }

  if (!operation) {
    return res.status(400).json({ error: 'Operation is required (add, subtract, multiply, divide)' });
  }

  let result;
  switch (operation.toLowerCase()) {
    case 'add':
      result = n1 + n2;
      break;
    case 'subtract':
      result = n1 - n2;
      break;
    case 'multiply':
      result = n1 * n2;
      break;
    case 'divide':
      if (n2 === 0) return res.status(400).json({ error: 'Cannot divide by zero' });
      result = n1 / n2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation. Use add, subtract, multiply, or divide.' });
  }

  res.json({ num1: n1, num2: n2, operation, result });
});

app.listen(PORT, () => {
  console.log(`Calculator app running on http://localhost:${PORT}`);
});
