'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const initialText = "I am gxcsoccer, a JavaScript programmer. I ❤️ coding!";

enum TerminalState {
  Typing,
  Selection,
  Projects,
  WeChat
}

export default function Home() {
  const [text, setText] = useState('');
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [terminalState, setTerminalState] = useState(TerminalState.Typing);
  const [selectedOption, setSelectedOption] = useState(0);
  const terminalRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (terminalState === TerminalState.Typing && currentChar < initialText.length) {
      const typingEffect = setTimeout(() => {
        setText(prev => prev + initialText[currentChar]);
        setCurrentChar(prev => prev + 1);
      }, 50);

      return () => clearTimeout(typingEffect);
    } else if (terminalState === TerminalState.Typing) {
      setTimeout(() => setTerminalState(TerminalState.Selection), 1000);
    }
  }, [currentChar, terminalState]);

  useEffect(() => {
    const cursorEffect = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorEffect);
  }, []);

  useEffect(() => {
    // 在组件挂载后自动聚焦到 terminal
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && terminalState !== TerminalState.Typing) {
      setTerminalState(TerminalState.Selection);
      return;
    }

    if (terminalState === TerminalState.Selection) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        setSelectedOption(prev => 1 - prev); // Toggle between 0 and 1
      } else if (e.key === 'Enter') {
        setTerminalState(selectedOption === 0 ? TerminalState.Projects : TerminalState.WeChat);
      }
    }
  };

  const renderTerminalContent = () => {
    switch (terminalState) {
      case TerminalState.Typing:
      case TerminalState.Selection:
        return (
          <>
            <div>{text}</div>
            <br />
            {terminalState === TerminalState.Selection && (
              <div>
                <div>Select an option:</div>
                <div style={{ color: selectedOption === 0 ? '#00ff00' : 'inherit' }}>
                  {selectedOption === 0 ? '> ' : '  '}my projects
                </div>
                <div style={{ color: selectedOption === 1 ? '#00ff00' : 'inherit' }}>
                  {selectedOption === 1 ? '> ' : '  '}wechat
                </div>
              </div>
            )}
          </>
        );
      case TerminalState.Projects:
        return (
          <div>
            <div>My GitHub: <a href="https://github.com/gxcsoccer" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00' }}>https://github.com/gxcsoccer</a></div>
            <div style={{ marginTop: '10px', color: '#888' }}>Press ESC to go back</div>
          </div>
        );
      case TerminalState.WeChat:
        return (
          <div>
            <div>Scan this QR code to add me on WeChat:</div>
            <div style={{ position: 'relative', width: '150px', height: '150px', marginTop: '10px' }}>
              <Image
                src="/wechat.jpg"
                alt="WeChat QR Code"
                layout="fill"
                objectFit="contain"
                onError={(e) => {
                  console.error('Error loading image:', e);
                  // 可以在这里设置一个替代的显示内容
                }}
              />
            </div>
            <div style={{ marginTop: '10px', color: '#888' }}>Press ESC to go back</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen minecraft-bg text-white overflow-hidden flex items-center justify-center">
      <div className="pixel-computer">
        <div className="pixel-monitor">
          <div className="pixel-screen">
            <motion.pre
              ref={terminalRef}
              className="minecraft-text text-green-500 whitespace-pre-wrap overflow-hidden p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              style={{ outline: 'none' }}
            >
              {renderTerminalContent()}
              {showCursor ? '_' : ' '}
            </motion.pre>
          </div>
          <div className="pixel-monitor-stand"></div>
        </div>
        <div className="pixel-keyboard">
          {['Esc', ...'1234567890-='.split(''), 'Backspace',
            'Tab', ...'QWERTYUIOP[]\\'.split(''),
            'Caps', ...'ASDFGHJKL;\''.split(''), 'Enter',
            'Shift', ...'ZXCVBNM,./'.split(''), 'Shift',
            'Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl'].map((key, i) => (
              <div key={i} className={`pixel-key ${key === 'Backspace' || key === 'Enter' || key === 'Shift' ? 'pixel-key-wide' :
                key === 'Space' ? 'pixel-key-space' : ''
                }`}>
                {key.length === 1 ? key : ''}
              </div>
            ))}
        </div>
        <div className="pixel-mouse">
          <div className="pixel-mouse-cable"></div>
        </div>
        <div className="pixel-tower">
          <div className="pixel-power-button"></div>
          <div className="pixel-disk-drive"></div>
          <div className="pixel-fan"></div>
        </div>
      </div>
    </div>
  );
}
