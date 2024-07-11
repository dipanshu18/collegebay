interface ButtonType {
  text: string;
}

export function PrimaryBtn({ text }: ButtonType) {
  return <button className="btn btn-primary w-full">{text}</button>;
}
