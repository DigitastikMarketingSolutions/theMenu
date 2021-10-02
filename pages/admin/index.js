import { Button } from "@material-ui/core"


function Admin() {
    return (
        <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
            <form action="/api/admin" method='POST' encType="multipart/form-data">
                <div style={{width: '50vw', height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "space-evenly"}}>
                    <input type="file" name="file" id="file" className="custom-file-input"/>
                    <Button type="submit" variant="contained" color="primary">Upload</Button>
                </div>
            </form>
        </div>
    )
}

export default Admin
