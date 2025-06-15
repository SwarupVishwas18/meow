function FormModal({ setIsModalVisible }) {
    return (
        <div className="form-modal">
            <div className="form-container">

                <div className="input-div">
                    <label htmlFor="movie-status">Movie Status : </label>
                    <select name="movie-status" id="movie-status">
                        <option value="">No Status</option>
                        <option value="0">To Watch</option>
                        <option value="1">Watching</option>
                        <option value="2">Watched</option>
                    </select>
                </div>
                <div className="input-div">
                    <label htmlFor="recommender">
                        Recommended By
                    </label>
                    <input type="text" name="recommender" id="recommender" />
                </div>
                <div className="input-div">
                    <label htmlFor="company">
                        Watching With?
                    </label>
                    <input type="text" name="company" id="company" />
                </div>
                <div className="watch-btn">
                    <button>Submit</button>
                    <button onClick={() => { setIsModalVisible(false) }}>Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default FormModal;