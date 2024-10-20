// src/components/AnimatedButton.js
import { useRouter } from 'next/router';

const AnimatedButton = ({ onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    onClick(); // Call the passed onClick function
    router.push('/DocumentGenerate'); // Navigate to the DocumentGenerate page
  };

  return (
    <span className='relative inline-block overflow-hidden rounded-full p-[1px]' onClick={handleClick}>
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <div className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-3 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl'>
        Start Generating
      </div>
    </span>
  );
};

export default AnimatedButton;
