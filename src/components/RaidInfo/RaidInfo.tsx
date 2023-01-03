import priceImage from '../../assets/price.png';
import avDogImage from '../../assets/avdog.png';

const RaidInfo = () => {
  return (
    <div className="p-3">
      <img src={avDogImage} alt="아브투견" />
      <img src={priceImage} alt="price" />
    </div>
  );
};

export default RaidInfo;
