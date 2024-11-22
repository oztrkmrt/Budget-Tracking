export function Card({ children, className = '' }) {
    return (
        <div className={`p-6 rounded-lg shadow-md ${className}`}>
            {children}
        </div>
    )
}