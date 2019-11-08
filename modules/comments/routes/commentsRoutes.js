
import comments_tempuserRoutes from './comments_tempuserRoutes';
import comments_commentRoutes from './comments_commentRoutes';
import comments_commenttypeRoutes from './comments_commenttypeRoutes';
    let commentsRoutes=Object.assign({}, comments_tempuserRoutes,comments_commentRoutes,comments_commenttypeRoutes);
export default commentsRoutes;
