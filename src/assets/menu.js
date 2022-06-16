export const menuData = [
  {
    id: '670146102797049856',
    parentId: '670146852931543040',
    weight: '0',
    name: '业务管理',
    method: 'GET',
    type: '0',
    children: [
      {
        id: '690463076030652416',
        parentId: '670146102797049856',
        weight: '0',
        name: '应用管理',
        path: '/admin/rest/system/application/info/list',
        method: 'GET',
        componentPath: '/applicationInfo',
        type: '0'
      },
      {
        id: '690463237616214016',
        parentId: '670146102797049856',
        weight: '0',
        name: '工单管理',
        path: '/admin/rest/system/application/order/list',
        method: 'GET',
        componentPath: '/applicationOrder',
        type: '0'
      },
      {
        id: '670146377914032128',
        parentId: '670146102797049856',
        weight: '0',
        name: '租户管理',
        method: 'GET',
        componentPath: '/tenant',
        type: '0'
      },
      {
        id: '674183547914067968',
        parentId: '670146102797049856',
        weight: '0',
        name: '试用申请',
        method: 'GET',
        componentPath: '/webContact',
        type: '0'
      }
    ]
  },
  {
    id: '670143955028189184',
    parentId: '670146852931543040',
    weight: '0',
    name: '系统管理',
    method: 'GET',
    type: '0',
    children: [
      {
        id: '670145990574252032',
        parentId: '670143955028189184',
        weight: '0',
        name: '运营部门管理',
        path: '/rest/system/dept/tree',
        method: 'GET',
        componentPath: '/department',
        type: '0'
      },
      {
        id: '670144627496755200',
        parentId: '670143955028189184',
        weight: '0',
        name: '运营角色管理',
        method: 'GET',
        componentPath: '/user-role',
        type: '0'
      },
      {
        id: '670172442602545152',
        parentId: '670143955028189184',
        weight: '0',
        name: '菜单管理',
        method: 'GET',
        componentPath: '/menus',
        type: '0',
        children: [
          {
            id: '675136066802720768',
            parentId: '670172442602545152',
            weight: '0',
            name: '编辑',
            method: 'POST',
            type: '1'
          },
          {
            id: '675131614049902592',
            parentId: '670172442602545152',
            weight: '0',
            name: '新增菜单',
            method: 'POST',
            type: '1'
          },
          {
            id: '675136177884667904',
            parentId: '670172442602545152',
            weight: '0',
            name: '删除',
            method: 'POST',
            type: '1'
          }
        ]
      },
      {
        id: '670145877806194688',
        parentId: '670143955028189184',
        weight: '0',
        name: '字典管理',
        path: '/rest/system/dict/list',
        method: 'GET',
        componentPath: '/dict',
        type: '0'
      },
      {
        id: '670144373393235968',
        parentId: '670143955028189184',
        weight: '0',
        name: '运营员工管理',
        method: 'GET',
        componentPath: '/account',
        type: '0'
      }
    ]
  }
]
