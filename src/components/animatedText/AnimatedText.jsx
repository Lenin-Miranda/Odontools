import "./AnimatedText.css";

export default function AnimatedText({ text }) {
  return (
    <h1>
      {text.split("").map((char, index) => {
        <span
          key={index}
          style={{ animationDelay: `${index * 1}s` }}
          className="jump"
        >
          {char}
        </span>;
      })}
    </h1>
  );
}
