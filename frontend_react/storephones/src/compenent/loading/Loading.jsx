import '../loading/Loading.css'
function Loading({ show }) {

    return (
        <>
            {show && (
                <div className="loading">
                    <span className='loading-child'>Loading...</span>
                </div>
            )}
        </>
    )
}
export default Loading;