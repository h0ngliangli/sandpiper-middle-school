# Google Sheets CMS Setup

学校数据存储在一个 Google Spreadsheet 中，分为 6 个 Sheet Tab。
老师、家长、学生均可通过编辑这个表格来更新网站内容，**无需重新部署代码**。

## 第一步：创建 Google Spreadsheet

1. 打开 [Google Sheets](https://sheets.google.com) 并新建一个表格
2. 将表格命名为 `Sandpiper Middle School - Website Data`
3. 在底部创建以下 6 个 Tab（名称必须完全一致）：

```
by-the-numbers
school-features
testimonials
grade-groups
events
faq
```

## 第二步：设置权限

点击右上角 **Share** → **Anyone with the link** → **Viewer**
（只需 View 权限，编辑者仍需单独添加为 Editor）

## 第三步：获取 Sheet ID

复制浏览器地址栏中的 ID，即 URL 中 `/d/` 和 `/edit` 之间的部分：
```
https://docs.google.com/spreadsheets/d/【这里是Sheet ID】/edit
```

将其填入项目的 `.env.local`（以及 `.env.staging.local` / `.env.production.local`）：
```
NEXT_PUBLIC_GOOGLE_SHEET_ID=你的Sheet ID
```

---

## Tab 结构说明

### Tab: `by-the-numbers`

| 列名 | 说明 | 示例 |
|------|------|------|
| `id` | 唯一 ID | `1` |
| `label` | 指标名称 | `Student-Teacher Ratio` |
| `value` | 数值 | `15:1` |
| `icon` | 图标名（见下方） | `Users` |

**可用图标名：** `Users` / `Trophy` / `SmilePlus` / `Bot`

---

### Tab: `school-features`

| 列名 | 说明 | 示例 |
|------|------|------|
| `id` | 唯一 ID（用于页面锚点） | `design-thinking` |
| `title` | 标题（全大写） | `DESIGN THINKING` |
| `description` | 正文段落 | `At Sandpiper...` |
| `imageUrl` | 图片路径 | `/images/design-thinking.jpg` |
| `imageAlt` | 图片说明 | `Students in a lab` |
| `reverse` | 图片是否在右侧 | `true` 或 `false` |
| `ctaText` | 按钮文字（可为空） | `Chat Now` |
| `ctaLink` | 按钮链接（可为空） | `https://wa.me/...` |

---

### Tab: `testimonials`

| 列名 | 说明 | 示例 |
|------|------|------|
| `id` | 数字 ID | `0` |
| `name` | 姓名（可为空，匿名） | `C.L.` |
| `role` | 身份 | `Current 8th Grader` |
| `content` | 评价内容 | `I love the close-knit...` |
| `avatar` | 头像图片 URL（可为空） | |

---

### Tab: `grade-groups`

| 列名 | 说明 | 示例 |
|------|------|------|
| `grade` | 年级数字 | `6` |
| `whatsappUrl` | WhatsApp 群链接 | `https://chat.whatsapp.com/...` |
| `groupImageUrl` | 群头像图片路径 | `/images/whatsapp-group-6.jpg` |
| `roomParents` | 房间家长（逗号分隔） | `Yi Wang, Manique Bloom` |

---

### Tab: `events`

| 列名 | 说明 | 示例 |
|------|------|------|
| `id` | 唯一 ID | `school-tour-20260312` |
| `title` | 活动名称 | `School Tour` |
| `summary` | 简短摘要（卡片显示） | `Join us for a tour...` |
| `description` | 完整内容（支持 Markdown） | `Thank you for signing up...` |
| `eventDate` | 活动日期 `YYYY-MM-DD` | `2026-03-12` |
| `expirationDate` | 下线日期 `YYYY-MM-DD`（过期后自动隐藏） | `2026-03-13` |
| `category` | 分类 | `Academic` / `Sports` / `Community` / `Arts` |
| `imageUrl` | 图片（可为空） | |

> **Tip：** `description` 支持 Markdown，例如 `**加粗**`、`[链接文字](URL)` 等。
> 在 Google Sheets 单元格内按 **Ctrl+Enter**（Mac: **Cmd+Enter**）可换行。

---

### Tab: `faq`

| 列名 | 说明 | 示例 |
|------|------|------|
| `question` | 问题 | `What are the school hours?` |
| `answer` | 回答 | `Sandpiper runs from 8:00 AM...` |

> FAQ 同时用于 AI 聊天机器人。每次修改后，机器人会在 **5 分钟内**自动更新。

---

## 数据缓存说明

- **页面数据**（By The Numbers、School Features 等）：服务端每 **5 分钟**刷新一次
- **客户端数据**（Testimonials、Events、WhatsApp Groups）：每次打开页面重新获取
- **FAQ / 聊天机器人**：服务端每 **5 分钟**刷新一次
