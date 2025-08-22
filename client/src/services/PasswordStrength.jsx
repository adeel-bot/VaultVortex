export default function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const percentage = (score / 5) * 100;

  if (score <= 2) return { label: "Weak", color: "linear-gradient(90deg, #ff4b5c, #ff6b81)", percentage };
  if (score === 3) return { label: "Medium", color: "linear-gradient(90deg, #f9d423, #ff4e50)", percentage };
  return { label: "Strong", color: "linear-gradient(90deg, #4cd964, #00c853)", percentage };
}
