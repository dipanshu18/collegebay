interface ButtonType {
  text: string;
}

export function SecondaryBtn({ text }: ButtonType) {
  return <button className="btn btn-secondary">{text}</button>;
}
