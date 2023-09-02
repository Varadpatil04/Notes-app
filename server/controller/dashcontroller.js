exports.dashboard = async (req, res) => {
    const locals = {
        title: 'dashboard',
        Description: 'Efficient Node.js-based notes app for organized, synchronized, and accessible note-taking, simplifying productivity and tasks.'
    }
    res.render("dashboard/dashindex", { 
        locals, 
        layout: '../views/layouts/dashboard' 
    });
}