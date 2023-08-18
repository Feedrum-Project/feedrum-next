import styles from "./style/star.module.sass";

interface IStar {
    reputation: number;
}

enum colors {
    red = "#F36A6A",
    green = "#6AEA3D",
    gray = "#BEBEBE",
}

const StarImage = ({ fill }: { fill: keyof typeof colors }) => {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.18782 10.933L6.5 7.86602V14H7.5V7.86603L12.8122 10.933L13.3122 10.067L8 7L13.3122 3.93301L12.8122 3.06699L7.5 6.13397V0H6.5V6.13398L1.18782 3.06699L0.687824 3.93301L6 7L0.68782 10.067L1.18782 10.933Z"
                fill={fill}
            />
        </svg>
    );
};

export default function Star({ reputation }: IStar) {
    return (
        <>
            <StarImage
                fill={
                    reputation === 0 ? "gray" : reputation > 0 ? "green" : "red"
                }
            />
            <span
                className={styles.count}
                style={{
                    color:
                        reputation === 0
                            ? "gray"
                            : reputation > 0
                                ? "green"
                                : "red",
                }}
            >
                {reputation}
            </span>
        </>
    );
}
