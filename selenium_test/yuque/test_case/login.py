#encoding utf-8
from selenium import webdriver 
import unittest,time
import ddt
import xlrd

url = "https://www.yuque.com"

def get_xldata(file_name):
    rows=[] 
    book=xlrd.open_workbook(file_name) 
    sheet=book.sheet_by_index(0)
    for row_idx in range(1,sheet.nrows):
        rows.append(list(sheet.row_values(row_idx,0,sheet.ncols))) 
    print(rows)
    return rows

@ddt.ddt
class LogInTestDemo(unittest.TestCase):
    index = 0
    @classmethod
    def setUpClass(self): 
        self.driver = webdriver.Firefox()
        self.driver.get(url)
        self.driver.implicitly_wait(5)
        

    @ddt.data(*get_xldata("yuque/data/login_info.xlsx")) 
    @ddt.unpack
    def test_dataDrienByObj(self, account, pwd, expect_text):
        if self.index == 0:
            self.driver.find_element_by_xpath("//*[@id=\"ReactApp\"]/div/div/div[3]/div[1]/div/div[2]/div/a[1]").click();
            self.driver.implicitly_wait(5)
        else:
            self.driver.forward()
        index = int(self.index) + 1

        try:
            account.isdigit()
        except Exception:
            account = int(account)

        # 输入账号
        self.driver.find_element_by_xpath("//*[@id=\"login\"]").send_keys(account)
        # 输入密码
        self.driver.find_element_by_xpath("//*[@id=\"password\"]").send_keys(pwd)
        # 点击登录
        self.driver.find_element_by_css_selector(".btn-login").click()
        time.sleep(2)
        # 验证是否有正确提示
        self.assertTrue(expect_text in self.driver.page_source)
        # 页面回退
        self.driver.back()

    @classmethod
    def tearDownClass(self): 
        self.driver.quit() 

if __name__=='__main__':
    unittest.main()
