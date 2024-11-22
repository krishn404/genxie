const Tooltip = (button, content) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.innerText = content;
    tooltip.style.position = 'absolute';
    tooltip.style.top = 'calc(100% + 5px)'; // Changed to 5px gap
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.zIndex = '1000';
    tooltip.style.maxHeight = '150px';
    tooltip.style.overflowY = 'auto';
    tooltip.style.display = 'none';
  
    button.appendChild(tooltip);
  
    button.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });
  
    button.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  };
  
  export default Tooltip;