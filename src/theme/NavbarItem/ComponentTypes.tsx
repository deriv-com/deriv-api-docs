/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import UserNavbarItem from '@site/src/components/UserNavbarItem';
import UserMenu from '@site/src/components/UserNavbarItem/UserMenu';

// We have to provide custom in the name of the component
export default {
  ...ComponentTypes,
  'custom-user-navbar-item': UserNavbarItem,
  'custom-user-menu': UserMenu,
};
