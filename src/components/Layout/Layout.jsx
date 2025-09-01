const Layout = ({ children }) => (
    <div className='layout' style={{display: 'flex', flexDirection: 'column',gap: '140px'}}>
    {children}
    </div>
)
export default Layout