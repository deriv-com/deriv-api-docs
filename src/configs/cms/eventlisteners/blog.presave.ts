import { CmsEventListener } from 'netlify-cms-core';
import { BLOG_POST_COLLECTION_NAME } from '../constants';
import { GITHUB_USER_KEY } from '../../localstorage';

const blog_presave_listener: CmsEventListener = {
  name: 'preSave',
  handler: ({ entry }) => {
    const collection_name = entry.get('collection');

    // We only want to save authors for `blog-post` collections
    if (collection_name === BLOG_POST_COLLECTION_NAME) {
      const github_user = JSON.parse(localStorage.getItem(GITHUB_USER_KEY));
      const github_username = github_user?.name ?? github_user?.login ?? 'Deriv User';

      const github_url = github_user?.html_url ?? 'https://github.com/deriv-com';

      const avatar_url =
        github_user?.avatar_url ?? 'https://avatars.githubusercontent.com/u/93753441?v=4';

      const authors = [
        {
          name: github_username,
          title: 'Front-End Developer',
          url: github_url,
          image_url: avatar_url,
        },
      ];

      return entry.get('data').set('authors', authors);
    }
  },
};
export default blog_presave_listener;
