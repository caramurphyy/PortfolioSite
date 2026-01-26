import './Introduction.css';
import TextHighlighter from "@/components/ui/text-highlighter";

function Introduction() {
  return (
    <div className="flex flex-col">
      <div className="name-text p-5">
        Hello! <br/>
        I'm <TextHighlighter type="wavy" highlightColor="#EC573F" strokeWidth={3} animationDuration={1.5}>
          <span>Cara</span>
        </TextHighlighter>
      </div>
      <div className="body-text p-5">
          I'm a software engineer who has always loved creating art. Here is a collection of my physical paintings - since AI has probably exceeded my talents as a digital artist. Always open to requests, message me! :)
      </div>
    </div>
  );
}

export default Introduction;

