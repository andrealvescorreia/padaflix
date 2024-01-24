import sadBreadBag from './imgs/sad-bread-bag.svg';
import styles from './EmptyMessage.module.scss';

const EmptyMessage = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.container}>
			<img src={sadBreadBag} alt='Sacola de pão vazia, com expressão triste' />
			<div>{children}</div>
		</div>
	);
};

export default EmptyMessage;
