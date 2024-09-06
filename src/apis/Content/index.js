
import styles from './index.module.css'

export default function Content({ children, title }) {
    return (<>
        <div className={styles.title}>
            {title}
        </div>
        <div className={styles.content}> {children}</div>

    </>)
}