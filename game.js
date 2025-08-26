// 游戏通用脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 创建背景动画
  createBackgroundAnimation();
  
  // 导航栏交互
  setupNavbarInteractions();
  
  // 按钮悬停效果
  setupButtonHoverEffects();
  
  // 页面切换动画
  setupPageTransition();
  
  // 弹出提示框功能
  setupNotificationSystem();
});

// 创建背景动画
define('createBackgroundAnimation', function() {
  const background = document.getElementById('backgroundAnimation');
  if (!background) return;
  
  // 创建粒子效果
  const particlesCount = 50;
  
  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement('div');
    
    // 随机大小
    const size = Math.random() * 4 + 1;
    
    // 随机位置
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // 随机动画持续时间
    const duration = Math.random() * 20 + 10;
    
    // 随机延迟
    const delay = Math.random() * 5;
    
    // 设置样式
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background-color: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      top: ${y}%;
      left: ${x}%;
      animation: float ${duration}s linear infinite ${delay}s;
      opacity: 0;
      z-index: 0;
    `;
    
    background.appendChild(particle);
  }
  
  // 创建浮动动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: ${Math.random() * 0.5 + 0.2};
      }
      90% {
        opacity: ${Math.random() * 0.5 + 0.2};
      }
      100% {
        transform: translateY(-1000px) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
});

// 设置导航栏交互
define('setupNavbarInteractions', function() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// 设置按钮悬停效果
define('setupButtonHoverEffects', function() {
  const buttons = document.querySelectorAll('button:not(.disabled)');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px)';
      this.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)';
      this.style.transition = 'all 0.2s ease';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
    
    button.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-1px)';
    });
  });
});

// 设置页面切换动画
define('setupPageTransition', function() {
  // 监听所有导航链接的点击事件
  const navLinks = document.querySelectorAll('a.nav-item');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // 如果是当前页面，则不执行动画
      if (this.classList.contains('active')) return;
      
      // 保存目标页面
      const targetPage = this.getAttribute('href');
      
      // 只有在非当前页面的情况下才阻止默认行为
      if (!targetPage.includes(window.location.pathname)) {
        e.preventDefault();
        
        // 添加淡出动画
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        // 延迟跳转到新页面
        setTimeout(function() {
          window.location.href = targetPage;
        }, 300);
      }
    });
  });
  
  // 页面加载时的淡入动画
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
  });
});

// 设置通知系统
define('setupNotificationSystem', function() {
  // 创建通知容器
  const notificationContainer = document.createElement('div');
  notificationContainer.id = 'notificationContainer';
  notificationContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  
  document.body.appendChild(notificationContainer);
  
  // 添加通知方法到window对象，方便调用
  window.showNotification = function(message, type = 'info', duration = 3000) {
    // 创建通知元素
    const notification = document.createElement('div');
    
    // 设置样式
    let bgColor, textColor;
    
    switch(type) {
      case 'success':
        bgColor = 'rgba(52, 211, 153, 0.9)';
        textColor = '#065f46';
        break;
      case 'error':
        bgColor = 'rgba(239, 68, 68, 0.9)';
        textColor = '#fff';
        break;
      case 'warning':
        bgColor = 'rgba(245, 158, 11, 0.9)';
        textColor = '#92400e';
        break;
      default:
        bgColor = 'rgba(59, 130, 246, 0.9)';
        textColor = '#fff';
    }
    
    notification.style.cssText = `
      background-color: ${bgColor};
      color: ${textColor};
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      font-family: 'STKaiti', 'KaiTi', serif;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;
    
    notification.textContent = message;
    
    // 添加到容器
    notificationContainer.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 自动移除通知
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        notificationContainer.removeChild(notification);
      }, 300);
    }, duration);
  };
});

// 简单的模块系统
define('define', function() {
  const modules = {};
  
  window.define = function(name, factory) {
    if (typeof name !== 'string' || typeof factory !== 'function') {
      throw new Error('模块名称必须是字符串，工厂函数必须是函数');
    }
    
    modules[name] = { factory, instance: null };
  };
  
  window.require = function(name) {
    if (!modules[name]) {
      throw new Error(`模块 ${name} 未定义`);
    }
    
    if (!modules[name].instance) {
      modules[name].instance = modules[name].factory();
    }
    
    return modules[name].instance;
  };
});

// 角色数据管理
define('characterManager', function() {
  const character = {
    name: '韩立',
    level: 9,
    realm: '练气期九层',
    health: 1500,
    maxHealth: 1500,
    mana: 1200,
    maxMana: 1200,
    attack: 180,
    defense: 120,
    speed: 150,
    luck: 80,
    
    // 获取角色状态信息
    getStatus: function() {
      return {
        name: this.name,
        level: this.level,
        realm: this.realm,
        health: this.health,
        maxHealth: this.maxHealth,
        mana: this.mana,
        maxMana: this.maxMana,
        attack: this.attack,
        defense: this.defense,
        speed: this.speed,
        luck: this.luck
      };
    },
    
    // 更新角色状态
    updateStatus: function(newStatus) {
      Object.assign(this, newStatus);
      
      // 触发状态更新事件
      const event = new CustomEvent('characterStatusUpdated', { detail: this.getStatus() });
      document.dispatchEvent(event);
    },
    
    // 增加修为，提升境界
    addCultivation: function(amount) {
      // 实际项目中会有更复杂的境界提升逻辑
      // 这里简化处理
      this.level += amount;
      this.updateStatus(this);
      
      return this;
    },
    
    // 恢复生命
    recoverHealth: function(amount) {
      this.health = Math.min(this.health + amount, this.maxHealth);
      this.updateStatus(this);
      
      return this;
    },
    
    // 恢复法力
    recoverMana: function(amount) {
      this.mana = Math.min(this.mana + amount, this.maxMana);
      this.updateStatus(this);
      
      return this;
    }
  };
  
  return character;
});

// 物品管理系统
define('itemManager', function() {
  const items = [
    { id: 1, name: '青灵剑', type: 'weapon', level: '练气期上品', price: 200, description: '锋利的灵剑，适合练气期修士使用' },
    { id: 2, name: '聚气丹', type: 'pill', level: '一阶', price: 15, description: '快速恢复法力' },
    { id: 3, name: '火球术', type: 'spell', level: '低阶', price: 100, description: '低阶攻击法术' },
    { id: 4, name: '玄铁', type: 'material', level: '一阶', price: 8, description: '炼器材料' },
    { id: 5, name: '青木盾', type: 'shield', level: '练气期', price: 120, description: '练气期防御法宝' },
    { id: 6, name: '培元丹', type: 'pill', level: '一阶', price: 30, description: '提升修炼速度' },
    { id: 7, name: '中品灵石', type: 'currency', level: '中品', price: 100, description: '高级货币' },
    { id: 8, name: '妖兽皮', type: 'material', level: '一阶', price: 5, description: '制衣材料' }
  ];
  
  const inventory = {
    items: [],
    
    // 添加物品
    addItem: function(itemId, quantity = 1) {
      const item = items.find(i => i.id === itemId);
      if (!item) {
        console.error('物品不存在');
        return false;
      }
      
      // 检查物品是否已在背包中
      const existingItem = this.items.find(i => i.id === itemId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ ...item, quantity });
      }
      
      // 触发背包更新事件
      const event = new CustomEvent('inventoryUpdated', { detail: this.items });
      document.dispatchEvent(event);
      
      return true;
    },
    
    // 移除物品
    removeItem: function(itemId, quantity = 1) {
      const itemIndex = this.items.findIndex(i => i.id === itemId);
      
      if (itemIndex === -1) {
        console.error('物品不存在于背包中');
        return false;
      }
      
      if (this.items[itemIndex].quantity <= quantity) {
        this.items.splice(itemIndex, 1);
      } else {
        this.items[itemIndex].quantity -= quantity;
      }
      
      // 触发背包更新事件
      const event = new CustomEvent('inventoryUpdated', { detail: this.items });
      document.dispatchEvent(event);
      
      return true;
    },
    
    // 获取背包物品列表
    getItems: function() {
      return [...this.items];
    },
    
    // 清空背包
    clear: function() {
      this.items = [];
      
      // 触发背包更新事件
      const event = new CustomEvent('inventoryUpdated', { detail: this.items });
      document.dispatchEvent(event);
    }
  };
  
  return {
    items,
    inventory
  };
});

// 任务管理系统
define('questManager', function() {
  const quests = [
    {
      id: 1,
      name: '初入修仙',
      type: 'main',
      level: 1,
      description: '前往青牛镇寻找药老，开始你的修仙之路',
      status: 'completed',
      reward: { exp: 100, gold: 50, items: [2] }
    },
    {
      id: 2,
      name: '除妖卫道',
      type: 'main',
      level: 5,
      description: '前往青牛山，消灭骚扰村民的青牛妖',
      status: 'in_progress',
      progress: 0,
      total: 1,
      reward: { exp: 500, gold: 200, items: [1] }
    },
    {
      id: 3,
      name: '采集灵草',
      type: 'side',
      level: 3,
      description: '帮助药老采集5株灵草',
      status: 'in_progress',
      progress: 3,
      total: 5,
      reward: { exp: 200, gold: 80, items: [6] }
    },
    {
      id: 4,
      name: '每日打坐',
      type: 'daily',
      level: 2,
      description: '每日打坐修炼，提升修为',
      status: 'available',
      reward: { exp: 150, gold: 100 }
    }
  ];
  
  // 获取任务列表
  function getQuests(filter = 'all') {
    if (filter === 'all') return [...quests];
    return quests.filter(q => q.type === filter || q.status === filter);
  }
  
  // 更新任务进度
  function updateQuestProgress(questId, amount = 1) {
    const quest = quests.find(q => q.id === questId);
    
    if (!quest) {
      console.error('任务不存在');
      return false;
    }
    
    if (quest.status !== 'in_progress') {
      console.error('任务未开始或已完成');
      return false;
    }
    
    quest.progress = Math.min(quest.progress + amount, quest.total);
    
    // 检查任务是否完成
    if (quest.progress >= quest.total) {
      quest.status = 'completed';
      
      // 触发任务完成事件
      const event = new CustomEvent('questCompleted', { detail: quest });
      document.dispatchEvent(event);
    }
    
    // 触发任务进度更新事件
    const event = new CustomEvent('questProgressUpdated', { detail: quest });
    document.dispatchEvent(event);
    
    return true;
  }
  
  // 接受任务
  function acceptQuest(questId) {
    const quest = quests.find(q => q.id === questId);
    
    if (!quest) {
      console.error('任务不存在');
      return false;
    }
    
    if (quest.status !== 'available') {
      console.error('任务不可接受');
      return false;
    }
    
    quest.status = 'in_progress';
    quest.progress = 0;
    
    // 触发任务接受事件
    const event = new CustomEvent('questAccepted', { detail: quest });
    document.dispatchEvent(event);
    
    return true;
  }
  
  // 完成任务并领取奖励
  function completeQuest(questId) {
    const quest = quests.find(q => q.id === questId);
    
    if (!quest) {
      console.error('任务不存在');
      return false;
    }
    
    if (quest.status !== 'completed') {
      console.error('任务未完成');
      return false;
    }
    
    quest.status = 'claimed';
    
    // 触发任务奖励领取事件
    const event = new CustomEvent('questRewardClaimed', { detail: quest });
    document.dispatchEvent(event);
    
    return quest.reward;
  }
  
  return {
    getQuests,
    updateQuestProgress,
    acceptQuest,
    completeQuest
  };
});

// 定义函数
define('define', function() {
  // 这是一个简化的模块定义函数，实际项目中可以使用更复杂的模块系统
  const modules = {};
  
  window.define = function(name, factory) {
    if (typeof name === 'string' && typeof factory === 'function') {
      modules[name] = factory;
    }
  };
  
  window.require = function(name) {
    if (modules[name]) {
      return modules[name]();
    }
    throw new Error(`Module ${name} not found`);
  };
  
  return { define, require };
});