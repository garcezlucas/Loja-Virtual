import './_loading.scss';

export const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando...</p>
        </div>
    );
}