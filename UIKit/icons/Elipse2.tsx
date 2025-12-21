export const Elipse2 = ({color = "#FD8F02"}: { color: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
        >
            <circle cx="5" cy="5" r="5" fill={color}/>
        </svg>
    );
};


