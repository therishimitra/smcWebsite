import React from 'react';
import ReactDOM from 'react-dom';
import SlideMessageContact from '../components/slideMessageContact';
import colors from '../css-colors';

import '../fade-styles.css';

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default function Fades() {
  return (
    <div className="FadeStyles">
        <SlideMessageContact/>
      
        <FadeInSection key={'darkred'}>
          <div className="box" style={{ backgroundColor: 'darkred' }}>
            Hey
          </div>
        </FadeInSection>
      
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Fades />, rootElement);
