import csv
import random
import datetime
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

file_name = 'data.csv'

with open(file_name, 'w', encoding='utf-8') as file:
    wr = csv.writer(file)
    wr.writerow(['日期', '销量', '单价'])
    startDate = datetime.date(2014, 1, 1)
    for i in range(1825):
        amount = 300+i*5+random.randrange(100)
        price=100+random.randint(1,5)
        wr.writerow([str(startDate), amount, price])
        startDate = startDate+datetime.timedelta(days=1)

data = pd.read_csv(file_name)
data = data[data.notna()]   # 清理NaN
data['日期'] = pd.to_datetime(data['日期'], format="%Y-%m-%d")

data = data.set_index('日期')
# 按月份销量
group_by_month = data.groupby(by = [data.index.year, data.index.month])
X = []
y = []
for name, group in group_by_month:
    X.append("%d-%d"%(name[0],name[1]))
    y.append(group['销量'].agg(np.sum))
#print(y)
plt.plot(X, y)
plt.xlabel('月份')
plt.ylabel('销售额')
plt.savefig('./one.png')
plt.show()


# 按年统计营业额

group_by_year = data.groupby(by = data.index.year)
X = []
y = []

for name, group in group_by_year:
    X.append(name)
    group['营业额'] = group['单价'] * group['销量']
    y.append(group['营业额'].agg(np.sum))

plt.bar(X, y)
plt.xlabel('年份')
plt.ylabel('营业额')
plt.savefig('./two.png')
plt.show()



# 按年销售量最大的月和销售额

group_by_year = data.groupby(by = data.index.year)

y = []
month =[]
for name, group in group_by_year:
    xse = []
    m = []
    # 将年按照月来分
    group_by_month = group.groupby(by = [group.index.month])
    for yue, g in group_by_month:
        m.append(yue)
        xse.append(g['销量'].agg(np.sum))
    print('name {}'.format(name))
    y.append(np.max(xse))
    month.append(str(name) + "-" +str( m[np.argmax(xse)]))

plt.bar(month, y)
plt.xlabel('月')
plt.ylabel('营业额')
plt.savefig('./three.png')
plt.show()


# 按年统计营业额生成饼状图

group_by_year = data.groupby(by = data.index.year)
X = []
y = []
for name, group in group_by_year:
    X.append(name)
    group['营业额'] = group['单价'] * group['销量']
    y.append(group['营业额'].agg(np.sum))

plt.pie(y, labels=X)
plt.savefig('four.png')
plt.show()